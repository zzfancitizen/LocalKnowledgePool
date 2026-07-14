---
title: "SAP Cloud Identity Services | Welcome to SAP Cloud Identity Services (SCI)"
source: "https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/Intro"
author:
published: 2025-12-09
created: 2026-06-18
description: "SAP Cloud Identity services (SCI) are SAP's strategic solution for enterprise-grade identity access management (IAM) in customers' SAP cloud landscapes."
tags:
  - "clippings"
---
SAP Cloud Identity services (SCI) are SAP's strategic solution for enterprise-grade identity access management (IAM) in customers' SAP cloud landscapes.

They decouple IAM requirements of two parties: administrators and developers:

- **Administrators** at **customers** want a single location across all SAP cloud solutions to manage users and their authorizations across applications and processes, and integrate with their corporate IAM solution(s). They are very close to the business, since user management is a key operational task, and also because of compliance requirements.
- **Developers** at **SAP, partners, and customers** want an easy to use programming model covering all aspects of IAM from application perspective. Especially SaaS developers at SAP and partners expect a highly standardized model, decoupled from heterogeneous landscape setups and 3rd party IAM tools used by customers.

As a mediator, we understand their needs and align them towards a single end-to-end solution, and shape SAP's Technology Guidelines [TG02 - Identity Authentication and Single Sign-On (SSO)](https://github.tools.sap/CentralEngineering/TechnologyGuidelines/tree/main/tg02) and [TG16 - Identity Provisioning and Lifecycle Management](https://github.tools.sap/CentralEngineering/TechnologyGuidelines/tree/main/tg16).

Overall, this guide is meant for application providers. Nevertheless, to understand to end customers and the role of SCI, this introduction covers both perspectives.

With Identity Authentication and Identity Provisioning services, SCI have been adopted a lot by SAP cloud applications already. On BTP, so far applications typically used the Authorization and Trust Management service (XSUAA) instead, often (but not always) acting as proxy to Identity Authentication services and receiving user data from Identity Provisioning service. Going forward, SCI is the strategic IAM service for SAP cloud overall and the successor of XSUAA. Development of new IAM features focuses on SCI. New applications should use SCI from the beginning. Established ones may follow the *IAM Evolution* and ["migrate" to SCI](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/BTP/migration/migration). Note: XSUAA is *not* simply deprecated in a way that all applications need to be migrated now. Existing applications usually migrate when there is a concrete value which cannot be fulfilled with XSUAA.

## Capabilities

SAP Cloud Identity services are made up of the following capabilities:

- **Authentication and single sign-on**
	- Authentication and principal propagation based on open standards (SAML, OIDC)
		- Integration of customers' corporate identity providers (IdPs), with "protocol conversion" to decouple protocols chosen for applications and corporate identity providers
		- Service: Identity Authentication (IAS)
- **Identity Lifecycle**
	- End to end identity lifecycle management from onboarding to offboarding
		- Multiple source systems like customer's corporate identity management system, SuccessFactors (employees), Fieldglass (contractors)
		- Central user store for applications without own user store, to search for users and retrieve typical user attributes
		- Targeting all SAP cloud solutions (and even on-premise systems), with different integration technologies
		- Services: Identity Directory (IdDS), Identity Provisioning (IPS)
- **Authorization Management**
	- Central administration of authorization assignments across LoB solutions and independently from application technologies
		- Integrated authorization management: powerful authorization management, ranging from basic functional authorizations ("create sales orders") to powerful instance-based authorizations ("manage employees in Germany, Austria, Switzerland")
		- Provisioning approach to replicate assignments to applications with own user store
		- Federation approach to provide group memberships and other user details for authorization decisions during application login
		- Services: Authorization management (AMS), Identity Directory (IdDS), Identity Provisioning (IPS)

## Administrator Perspective

Many customers use 3rd party IAM tools for their whole IT landscape. They manage users, enforce secure authentication, enable single sign-on, and also control authorizations across the whole system landscape. Looking at the broad range of quite heterogeneous SAP applications, administrators today need to deal with many different technologies. They expect SAP to simplify administration by handling this complexity internally.

Today, customers are still in a quite basic stage: They already configure IAS to delegate user authentication to a corporate IdP. Since often they use IAS as pure proxy, most users are not known to the identity directory, and thus administrators have no way to manage authorizations there. Customers rather use IPS, again often as a proxy, to provision users and their authorizations to individual applications. They often use point-to-point trusts between applications to propagate users via API calls, which is hard to maintain over time.

The vision for SAP Cloud Identity services is that customers - with and without corporate IAM tools - use SCI as the **central place in SAP cloud to manage IAM**. Administrators just make sure all users are known to the identity directory, and don't care whether and how user data needs to be replicated to concrete applications. All users' authorization assignments are known there, including composite roles to group them. SAP takes care of how applications receive the authorization. This also enables compliance to focus on SCI, with Identity Access Governance enforcing compliant authorization management, and having audit-relevant data in the identity directory. All applications trust the same SCI tenant, which makes it easy to set up and continuously maintain principal propagation.

Some customers prefer SAP-operated over hyperscaler data centers, so they have the choice for SAP Cloud Identity services. In any case, usage is free for customers in the context of most SAP cloud applications and also custom development with BTP. By default, customers get a pair of default tenants, one for productive use and one for testing. Additional tenants are possible and charged.

Since SAP applications target a wide range of business users, UX is very important. Beyond "invisible" aspects like single sign-on and principal propagation, customers also benefit from SCI's options for branding and customization.

## Developer Perspective

SaaS developers (at SAP and also partners) need an abstraction from such heterogeneous customer landscapes. They need a standardized programming model which just works everywhere. Developers of custom applications don't depend so much on standardization. Yet they appreciate this abstraction as well, since it helps them build personal knowledge which they can reuse in other projects, be it with other SAP applications or other customers.

For SAP applications, SAP Cloud Identity services support all kinds of **infrastructures** to run and orchestrate applications: Many applications have their own infrastructures. The amount of applications using BTP is growing. Non-BTP applications are typically provisioned using SPC, with application-specific logic. BTP applications today typically use service brokers (OSB) and SaaS registry / subscription management service (SMS) in a self-service fashion. [Unified Services](https://pages.github.tools.sap/atom-cfs/atom-docs/docs/about-atom/) consistently enable a self-service model for provisioning across both BTP and non-BTP content.

Almost every application and most reuse services require **authentication**, for technical communication and human users, including principal propagation. Developers expect this to "just work", independently from diverse configurations and integrations at customers. They prefer mechanism based on open standards, to be able to use standard software components as much as possible and for integration with 3rd party solutions. Availability and performance are extremely important because users cannot access applications otherwise.

For **authorization**, there are two major cases: Traditional LoB applications often bring their own authorization management, sometimes with quite advanced and application-specific options to model authorizations. Developers expect a good integration of their local authorization management with any tools used by customers to manage user assignments. This is the domain of the Identity Provisioning service (IPS). For many applications, especially mass development with BTP at SAP, partners, and customers, developers prefer delegating authorization management to a reuse service. They only declare the fundamental authorization model and define which authorization is required for which operation. SCI offers the Authorization Management service (AMS), which supports both functional as well as powerful instance-based authorizations ("restrictions").

The same split also applies to applications which need **user data** apart from the logged-in user: Applications with own user store obviously just rely on that, popupated by IPS. Mainstream applications rather prefer delegating this to a reuse service, expecting an easy to integrate, highly scalable, and fast API. SCI's Identity Directory for Application (IdDS4A) addresses this need.

SaaS applications require **multitenancy**. Some traditional LoB applications handle this completely on their own, with the complexity of individual trust configurations and user provisioning setups per tenant. SCI offers a model with built-in multitenancy, based on open standards and extending them where needed. Applications then only need a single trust configuration for all tenants, a single credential that works for all SCI capabilities, and a single authorization model which is automatically available and updated in all tenants.

With BTP, many developers use the **Cloud Application Programming model (CAP)** to handle all these aspects to a large extent, so that they can focus on their business domain and mostly just declare their authorizations as part of their overall data model.

## Reference Architecture

![Reference architecture](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/assets/images/sci-reference-architecture-12491ec1b2f9256134f94b7899c8c8dd.png)

## Further Information

Public resources:

- [CIO Guide: Identity Lifecycle in SAP Landscapes](https://www.sap.com/documents/2018/05/38ce7d25-067d-0010-87a3-c30de2ffd8ff.html)
- [SAP Cloud Identity Services - Solution Overview](https://www.sap.com/documents/2024/04/84ada3ed-b87e-0010-bca6-c68f7e60039b.html)
- [SAP Community: SAP Business Technology Platform Security](https://pages.community.sap.com/topics/btp-security)
- [Help Portal documentation](https://help.sap.com/docs/cloud-identity-services)
- [External roadmap](https://roadmaps.sap.com/board?range=CURRENT-LAST&PRODUCT=67837800100800007337&PRODUCT=73555000100800000425#Q3%202024)

SAP-internal resources:

- [Work Zone: SAP Cloud Identity Services](https://workzone.one.int.sap/site#workzone-home&/groups/e7Wsy6rTJQSe6qS2A26jlj/workpage_tabs/QXog7phd16KJhJl2GsWKnu)
- [Kernel Services: Identity](https://pages.github.tools.sap/kernelservices/services/identity-service)
- [Internal roadmap](https://wiki.one.int.sap/wiki/display/idmsec/Roadmap)
- [Product team](https://wiki.one.int.sap/wiki/display/idmsec/Product+Team)