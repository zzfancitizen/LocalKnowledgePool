---
title: "Documentation of Coverage Exemption Tool (SCLS) - S/4HANA"
source: "https://wiki.one.int.sap/wiki/spaces/SimplSuite/pages/3580008234/Documentation+of+Coverage+Exemption+Tool+SCLS"
author:
  - "[[Mecke]]"
  - "[[Christoph]]"
published:
created: 2026-05-12
description:
tags:
  - "clippings"
---
**Page Owner: Christian Lehmann**

## 1\. Guidance for Exemptions

As a test automation expert, you need to judge whether requested coverage exemptions make sense or not. The descriptions and use cases below shall help you to identify whether an exemption request is justified or not and how to properly maintain it.

Consider those constraints below based on the ObjectType of the requested exemption object.

If you have any other exemption requests, it is very likely a not justified exemption request and should be rejected. If in doubt, align with other more-experienced test automation contacts or raise the question in the test automation community chat or meeting.

## 1.1. ObjectType "WAPA", "TRAN" or “WDYA” (Apps)

One might request a coverage exemption of ObjectType "WAPA", "TRAN" or “WDYA” which indicate a new UI based application and provide the ExemptionReason that the application is postponed. If the ExeptionType is set to "POSTPONE" and the ExemptionValidity is set to a date in the near future (up to one year), this exemption is justified. The ExemptionReason does not matter much in this case, as the two main attributes reflect a postponement. If the exemption date is further in the future, this is not considered a postponement. If the ExemptionReason explains a postpone activity, but the ExemptionType does not reflect this, this is an inconsistency. Similarly, if the ExemptionType is of type “POSTPONE” but the ExemptionReason states something different (e.g. technical difficulties), this is also an inconsistency.

If a TRAN object is stated to be "OBSOLETE", this cannot be, since all not active TRAN objects are filtered out already. If this entry exists in the reporting, it is available to customers and shall be tested and covered. This also includes objects which are “deprecated” to our customers, as existing customers can still use them until the object is in status “Removed”, “Sunset”, “Retired” or similar final status value which prevents the usage by customers.

There might be rare reasons when an application cannot be tested by an automate. In this case, choose ExemptionType “TECHNICAL” and provide the requirement link raised for the test automation tool enhancement in the ExemptionReason field.

## 1.2. ObjectType "CLAS", "FUGR" or "PROG" (ABAP Code)

This is about actual code coverage for a n ABAP source code object. There are rare situations only where a coverage exemption would make sense. If the ExeptionType is set to "POSTPONE" and the ExemptionValidity is set to a date in the near future (up to one year), this exemption is considered justified – even though, such code coverage can be achieved even if the actual feature is part of a later delivery only!

If the ExeptionType is set to "OBSOLETE", the exemption is justified.

ExemptionReasons like "not relevant for cloud" are not justified since the object shall be moved into a non-cloud package (e.g. Future Cloud) instead. This way, it will not be considered during regression test runs at all.

"SSCUI" is also no valid exemption since SSCUI classes shall make use of the SSCUI test framework.

In general, every ExemptionReason that talks about technical limitations are to be considered not justified because all those three object types can be automated if designed appropriately.

If the ExemptionReason refers to "legacy", it means code which was created before 2016. But in those cases, no exemptions are required as the coverage goals are to have at least the same coverage as before the changes. This is easy to plan, achieve and requires no exemption.

If the ExemptionReason refers to being not efficient due to very few code only or other similar reasons, the ExemptionType shall be NOTEFF accordingly.

## 1.3. ObjectType "BDEF" (RAP business objects)

There is no need for coverage exemptions besides ExemptionType POSTPONE or OBSOLETE. The ExemptionReason and ExemptionValidity shall also reflect the same.

## 1.4. ObjectType "DDLS" (CDS Views)

If the ExeptionType is set to "POSTPONE" and the ExemptionValidity is set to a date in the near future (up to one year), this exemption is justified.

If the ExeptionType is set to "OBSOLETE", the exemption is justified.

## 1.5. ObjectType “G4BA” or “IWSV” (OData Services)

There is no need for coverage exemptions besides ExemptionType POSTPONE or OBSOLETE. The ExemptionReason and ExemptionValidity shall also reflect the same.

In very few cases, the OData service cannot be called with the Local Client Proxy test framework accordingly and you may need to maintain ExemptionType “TECHNICAL” and provide the requirement link in the ExemptionReason which addresses this shortcoming.

## 1.6. ObjectType “WEBI” (SOAP Services)

There is no need for coverage exemptions besides ExemptionType POSTPONE or OBSOLETE. The ExemptionReason and ExemptionValidity shall also reflect the same.

## 2\. Use of classification tool

Classification tool can be used to classify objects relevant for test automation with respect to certain properties. **Please note that from CE2402 onwards TA reporting is done with [Appedia App](https://prod.appedia.only.sap/#DeliveryProgram-report)****. Appedia takes the exemption data directly from system under test only (HBR, OC7, HC7,...). Therefore all classifications have to be transported into these systems from their respective development/correction systems in order to become visible in the Appedia reporting (example: ER1.815 → HBR, HC5 → HC7,...)**

Classification artifacts to be created in HOME package (same as central coverage reports or in accounting test packages).

Object Types:

ABAP Objects, OData Services, CDS Views, BSPs, Transaction, WebDynpros:

- Classes (CLAS)
- Programs (PROG)
- Function Groups (FUGR)
- (Fiori) BSP Applications (WAPA)
- OData service V2 (IWSV)
- OData service V4 (G4BA)
- (CDS) Data Definition Language Source (DDLS)
- Web Dynpro Applications (WDYA)
- Transactions (TRAN)

It is not possible to grant exemptions on method or function module level! You have to exempt the entire class or function group instead.

Attributes:

Alternative ACH component to remap ownership of objects which cannot be easily relocated in a correct package. Preferred solution is to move objects to correct package. Value help for ACH components for this attribute. As an example: Object in FI package that belongs to localization. Other example: Accounting internal change between teams. Does currently not work for AIS (and FXU).

Some kind of Sign-off flag to be maintained by responsible test automation contact of receiving area

For AIS objects still to be discussed. Maybe use temporary attribute processing org unit (AIS, Dev)

**Exemption mechanism on single object level. To be checked if there's also exemption process from central program.** Possible reasons: Not Cloud relevant, Generated coding, Helpdesk/Utility tools, (Archiving programs), BADI example implemantations, Communication scenarios, ABAP UI logic, Apps not supported by START. Each exemption should also have a comment with details.

**Classification can be read form Table: CLS\_ASSIGNMENT; Field ATTRIBUTE** → E.g S4\_TA\_ALT\_ACH;...; Field VALUE for the value which has been classified; TROBJECTTYPE for CLASS, PROG, etc.; SOBJ\_NAME for the Object name.

## 2.1. How to classify Exemptions with respect to Test Automation Coverage

- There is now an authority check the maintenance of the Exemption Type and on Alternative ACH etc. This should only be done by the [Area Automation contacts](https://workzone.one.int.sap/site#workzone-home&/wiki/show/XyKPHYXMeCYPCUF72RLHaj?_lightbox=true). In case there a Contact is missing → maintain on the same and afterwards contact Soubhagya Mohanty ([soubhagya.mohanty@sap.com](mailto:soubhagya.mohanty@sap.com))
- The team assignment (Team\_ID) can be maintained by everyone (no authorization check is on this attribute)
- there is an issue in ER6 / 815 when using /nSCLS classify → you shall mark the (yellow) flag as well:

![](https://wiki.one.int.sap/wiki/download/attachments/3580008234/image2018-3-9_11-10-49.png?version=1&modificationDate=1688449053000&api=v2)

### 2.1.1. Exemptions

Exemptions are needed if test relevant object shall or cannot be covered via test automates.

Currently following Object types are relevant:

CLAS  
DDLS  
FUGR  
IWSV  
PROG  
TRAN  
WAPA  
WDYA

For documenting an exemption the following attributes are defined via classification tool (Transaction SCLS):  
Exemption Type - Drop down list box - **mandatory to be filled**

TECHNICAL (technically not possible according to [guideline](https://jam4.sapjam.com/groups/DmwWGmnsubLjsddVM4XiMC/documents/y2bKWwQ3TyJFcYXBtYYo8t/slide_viewer))  
NOTEFF (effort too high, reason will be deprecated soon)  
POSTPONE (customer shipment of object postponed to later release validity date mandatory)  
OBSOLETE (object no longer relevant)  
OTHER (should not be used, reason will be deprecated soon)  
NOTCLOUD (object not cloud relevant)  
SSCUI (object is SSCUI but not identified by testcov\_bb as such please inform Christian Lehmann)

Exempted KPI - Drop down list box - **mandatory to be filled**

Q\_UNIT: Fiori (WAPA) QUnit exemption  
START: Fiori (WAPA) START exemption  
ALL: all objects: all relevant KPIs  
CDS: CDS views (DDLS)  
ODATA: OData services (IWSV)  
ABAP\_UNIT: ABAP statement/branch coverage (CLAS,PROG,FUGR)  
QATL: (will only be relevant as exemption for transport releases but not the MARVIN coverage itself)

Exemption Reason → Free text - **mandatory to be filled**

Exemption Requester - Free text → SAP Username in capitals (e.g. LEHMANNCH) - **mandatory to be filled**

Exemption Validity → Date field - **mandatory to be filled for coverage exemptions** → save does not always work, it depends on your SAP GUI date settings how you have to enter the date.

The Exemption Validity field is only applied to coverage exemptions. If you maintain an alternative Team ID, ACH component or Responsible, they will always be valid, no matter what is entered in the Exemption Validity field. To remove such assignments, you must clear the responsibility field and re-transport this change.

### 2.1.2. Allowed Exemptions

In the table below you'll find the valid combinations that you can enter via the classification tool for the exemptions. Please keep in mind that the exemption rules can change over time (Last check in November 2022).

| Exemption Object | Exemption KPI | Exemption Type | Comment (\* = all) |
| --- | --- | --- | --- |
| BDEF | ALL | POSTPONE | All postpone dates later than "today+365 days" are rejected |
| BDEF | ABAP\_UNIT | POSTPONE | All postpone dates later than "today+365 days" are rejected |
| BDEF | ALL | OBSOLETE |  |
| BDEF | ABAP\_UNIT | OBSOLETE |  |
| CLAS | ALL | \* |  |
| CLAS | ABAP\_UNIT | \* |  |
| DDLS | ALL | \* |  |
| DDLS | CDS | \* |  |
| FUGR | ALL | \* |  |
| FUGR | ABAP\_UNIT | \* |  |
| G4BA | ALL | POSTPONE | All postpone dates later than "today+365 days" are rejected |
| G4BA | ODATA | POSTPONE | All postpone dates later than "today+365 days" are rejected |
| G4BA | ALL | OBSOLETE |  |
| G4BA | ODATA | OBSOLETE |  |
| IWSV | ALL | \* |  |
| IWSV | ODATA | \* |  |
| PROG | ALL | \* |  |
| PROG | ABAP\_UNIT | \* |  |
| TRAN | ALL | \* |  |
| TRAN | START | \* |  |
| WAPA | ALL | \* |  |
| WAPA | START | \* |  |
| WAPA | Q\_UNIT | \* |  |
| WDYA | ALL | \* |  |
| WDYA | START | \* |  |

## 3\. Start Classification Tool

## 3.1. Find the right system for the exemption

In order to maintain the exemption, you need to figure out the original system of the object you want to exempt. In most of the cases, this will be ER1 and in rare cases the object is developed in ER6. Depending on the original system, you need to grant the exemption in the same system and also consider the right package for this (see transport settings below). In case the exemption is required during the correction phase (between End and Start of Integration), you may need to double maintain the exemption additionally in ER3 - just in case the exemption is required for the major release reporting.

To create the exemption logon to the right system

- ER1, ER3/EZV or ER6 client 815 Use transaction **/nsclas** - function: "Start Classification Tool"

![](https://wiki.one.int.sap/wiki/download/thumbnails/3580008234/image2018-2-6_16-53-43.png?version=1&modificationDate=1688449053000&api=v2)

you will get the following Screen

![](https://wiki.one.int.sap/wiki/download/attachments/3580008234/image2018-2-6_16-54-23.png?version=1&modificationDate=1688449053000&api=v2)

### 3.1.1. "Choose Characteristics"

press selection "Choose Characteristics" and select the 5 characteristics that start with "Exempt\*" in the node "other characteristics".

IMPORTANT: Select only the objects you need to classify via the selection of "Objects Type" and "Object Name". Only the listed object type make sense: CLAS; DDLS; FUGR; IWSV; PROG; TRAN; WAPA; WDYA

To ensure to exclude Home objects from the selection (as these should not be relevant for coverage) exclude the Software component: SAPPCORE\_H, SAPSCORE\_H and SAPOCORE\_H on the selection screen field "Software Component"

→ "execute" → you will see the following Output list (maybe you have to adopt you ALV list accordingly and save) of course with your objects

![](https://wiki.one.int.sap/wiki/download/attachments/3580008234/image2018-2-6_17-5-1.png?version=1&modificationDate=1688449053000&api=v2)

### 3.1.2. "transport settings"

press button "transport settings" and put in package

**OBJ\_CLASSIFICATIONS\_ER1** (in ER1/815) or

**S4\_OBJ\_CLASSIFICATION\_CLD** (in ER6/815) or

**CUAN\_OBJ\_CLASSIFICATIONS** (in ABD/815) and

a valid transport for your objects (in ER1/815 or ER6/815) - which you should release afterwards and shall not contain other objects than the classification relevant.

**During the phase of double maintenance (between EoI and SoI), you first maintain the exemption in ER1 or ER6 and then double maintain the same in EZV - and assign it to the same package as in ER1 or ER6 also in EZV!**

Double Maintenance

Make sure to double maintain this in ER1/ER6, else the exemption cannot be released from EZV! You will have to provide the transport number from ER1/ER6 during transport release in EZV where it checks for double maintenance.

A valid transport is assigned to an increment in CILTS. We from test automation recommend to have the feature increment for any exemptions you give in the context of a feature. In other cases (e.g. if one wants to delete an exemption later), the increment of type correction would be an option.

Increment assignment

Keep in mind that the exemptions are bound to the transport and the transport to the increment. If you assign exemptions to the wrong increment, they will not be available in AIQ or delivery if the object is integrated without the exemption.

Then press "Save Settings".

![](https://wiki.one.int.sap/wiki/download/attachments/3580008234/image2018-2-6_17-9-33.png?version=1&modificationDate=1688449053000&api=v2)

Back on the screen before you select the object you want to classify and press button change "selected objects".

- TEAM ID MAINTAIN only, you may select the lines and columns by pressing the CTRL button.  
	![](https://wiki.one.int.sap/wiki/download/attachments/3580008234/select%20teamid.PNG?version=1&modificationDate=1688449053000&api=v2)
- Other column maintain.

Depending on the number of objects it will last a while until all classification data for the selected objects is locked. Once this happened you will see the fields editable.

![](https://wiki.one.int.sap/wiki/download/attachments/3580008234/image2018-2-6_17-16-22.png?version=1&modificationDate=1688449053000&api=v2)

fill in the data and press save button. → done

### 3.1.3. Exemptions for CFD

If you have created an exemption for object A for the main release and at some point (before the main release has EoI) you have the need to also apply the same exemption for CFD, you need to add the entire exemption to a new transport which is then integrated into the CFD landscape. For this, you need to open the existing exemption in the source system (e.g. ER1), edit ALL of the fields which are also relevant for CFD and then save it. You must then have as many characteristics entries on the transport as you have relevant fields in the exemption. If you do not edit all of the fields and perform dummy changes, only the changed fields will be part of the transport and then be integrated into the CFD landscape. This is rather unfortunate, since the exemptions will continue to look fine in the Infinity landscape but as soon as you integrate this into CFD where the previous main release characteristic entries are missing, you will have an inconsistent and thus irrelevant/ignored exemption.

### 3.1.4. Release your transport.

Before release of transport

Before you release your transport, you should check that all the data you maintained is consistent and according to the rules above. Unfortunately, the generic classification tool does not allow to integrate such checks into the transaction. But there is the transaction TESTCOV\_INCON\_EXEMPT available in ER1, ER3 and ER6 to check for your exemption. If the maintained exemption is NOT in that list, you did everything right. If it appears in that transaction, you can check the "remark" column to see what you did wrong.

The classification data will be transported in the home layer (especially to ER6 / ER3 and HBR (and the Main test systems).

**Use Attribute: in ER6: CLOUD\_ONLY\_HOME; in ER1: SAPPCORE\_H**

The data will be transferred and used for the Test automation Coverage reporting.