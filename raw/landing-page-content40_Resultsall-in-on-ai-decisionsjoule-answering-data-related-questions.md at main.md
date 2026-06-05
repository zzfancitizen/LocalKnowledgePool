---
title: "landing-page-content/40_Results/all-in-on-ai-decisions/joule-answering-data-related-questions.md at main"
source: "https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/joule-answering-data-related-questions.md"
author:
published:
created: 2026-06-04
description: "CPA Landing Page on SharePoint. Contribute to CPA/landing-page-content development by creating an account on GitHub."
tags:
  - "clippings"
---
## Decision Status

*Accepted* | May 19th, 2026

## Context – Why are we making this decision?

- Enable customers to use Joule asking generic natural language (NL) queries which utilize Data Products

### Status Quo

- Joule will allow customers to ask any NL query, of any complexity, over SAP data
- Current means for Joule answering NL queries are API calls into the transactional source systems (OData, REST, SQL)
- Complex NL queries which need more than one API call results in Joule orchestrating their execution and combining the data returned by each call

### Challenges

- To execute a complex NL query, the Joule orchestration of several API calls concretely involves a sequence in which the values returned by a prior call are used as filters on a following call.
	- This Joule behavior is effectively equivalent to the query engine of a relational database implementing joins across tables.
		- Specifically, Joule orchestration behaves as nested-loops joins (NLJ), a join algorithm which does not scale well.
		- Joule lacks the proven technology of the SQL compilation (including cost-based query optimization) and execution (multiple join methods, aggregation, etc.) of a relational database. And Joule does not aspire to become a SQL database engine.
- Alternatively, BDC offers uniform access to all SAP business data, across all applications, as Data Products (DPs). DPs are relational tables stored in the BDC Foundation Services (BDC/FOS) object store. To process DPs, HANA Cloud implements SQL-on-Files, native SQL processing over such object store data.
	- In order to answer a complex NL query based on Data Products (DPs), we need to generate an equivalent complex SQL query.
		- For that, we need proper grounding of the LLM which understands the DP domain → we need the SAP KG to contain a representation of DP metadata: the tables and their joins.
		- Brownfield customers often have complex landscapes, with multiple tenants of several SAP applications. No matter the complexity of the customer landscape, all of the business data of all of the application tenants is still available as DPs and can still be accessed without application boundaries through SQL. But to generate correct joins across DPs of different application tenants, we need the SAP KG to contain a representation of the customer landscape → we need to support a customer specific KG
		- The SAP KG needs to know both the canonical data model of the LoBs but also the metadata for Data Products including customer extension field → we need again to support a customer specific KG
		- Note: to cover cross-app queries and customer extension fields, the customer specific KG is needed independently of the data access path; the API call access path would also need a customer specific KG
- However, the DPs in BDC/FOS contain datasets with a delayed snapshot, not with transactional freshness
	- BDC/FOS implements a Medallion architecture, where the tables in the object store are incrementally maintained by iteratively applying batches of transactional data change feeds, hence with a lag behind the transactional snapshot.
		- It is not suited when data freshness is required, e.g. by a "read my own writes" access pattern.

---

## Options – What are the options?

**Option 1:** Continue to have only Joule and APIs for complex queries

**Option 2:** Introduce a Virtual Scenario Provider for executing SQL queries over Data Products

---

## Decision – What is the decision including scope of the decision?

> **Decision: We decide for Option 2**

This decision covers:

- Leveraging SAP KG as a per-customer global overarching KG which has knowledge about LoB metadata but enhance it with Data Product metadata including customer extension fields and landscape specific JOIN information
- When Joule invokes the "Data Products SQL access" VSP
	- The natural language query is used to identify the query specific KG metadata artefacts which are able to satisfy the user query (DP entities and their relationship)
		- This specific metadata along with the NL query is sent to AutoSQL for generation of the corresponding SQL statement
		- The VSP returns a single virtual scenario containing the corresponding SQL statement and the destination to the BDC SQL Execution Service (DPQuery)
- Joule executes the virtual scenario covering the query
	- DPQuery receives the SQL statement and executes it in its HANA Cloud via SQL-on-Files based on the Virtual Tables pointing to the actual Data Products
		- The query result is returned back to Joule and presented to the user
- Remark: Authorizations for Data Products are out of scope for this document and will be described in a dedicated [document](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/data-product-authorizations.md)
- Remark: The VSP option is an interim solution. Long-term strategy is to make Joule use Agent Gateway with KG and AutoSQL being integrated into Agent Gateway. This difference in architecture does not contradict or invalidate the other statements and the generic direction of the decision to push joins into the DB.

---

## Reasoning – Why did we decide it?

- This VSP returns a single virtual scenario covering a complex query
- This is a "divide and conquer" approach to answering complex NL queries, which is divided in two cleanly separated parts:
	- The SAP KG based SQL generation part, where the intrinsic complexity of the NL query is absorbed
		- The SQL query execution part, which is done in HANA, a mature database engine, and is removed from the Joule orchestration
- This results in better query accuracy
	- Using powerful tools of coarser granularity is an AI agentic architecture pattern
		- Less risk of hallucination utilizing the SAP KG which understands the business domain leading to accurate SQL query generation
- This results in better performance and scalability of query execution
	- Query execution is not a sequence of API calls where Joule effectively federates through the app platform into the app's transactional database
		- Execution of JOINs does not need to happen in Joule

### Assumptions

- Joule is optimized to select the Virtual Scenario Provider described above
- Joule is able to detect and exclude cases when data freshness is required
- When the customer landscape has multiple SAP application tenants, cross-application queries are supported when the underlying applications have their datasets harmonized
- There is a per-customer SAP KG, which reflects the customer landscape, including the cross-application joins across harmonized data domains
- The subset of the SAP KG covering the NL query can be accurately identified
- In most cases, the above KG subgraph is connected, i.e. a complex NL query has a single equivalent SQL query
- AutoSQL can generate accurate SQL queries based on the above SAP KG subgraph

---

## Who made the decision?

**Joule**

**KG**

**BDC**

---

## Contact – Whom to contact in case of questions?

- [Bjoern Friedmann](mailto:bjoern.friedmann@sap.com)
- [Mihnea Andrei](mailto:mihnea.andrei@sap.com)