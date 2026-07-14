---
title: "Welcome to SAP Cloud Identity Services (SCI)"
source: "https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/Getting-Started/Configuring-IAS"
author:
published: 2026-05-06
created: 2026-06-18
description: "Obtaining an SCI Tenant"
tags:
  - "clippings"
---
## Obtaining an SCI Tenant

If you don't have a tenant yet, request one [as documented](https://wiki.one.int.sap/wiki/spaces/idservice/pages/1626014896/How+to+Request+a+Tenant+of+Identity+Authentication+Service).

Please note:

- BTP - based subscription here is just a compliant vehicle for commercial processes around creating SCI Tenants. It has nothing to do with the fact that you may / or not develop a BTP-based application.
- The BTP DCs in which you can request your multi-tenant IAS Tenants have more to do with internal SCI-Deplyoment logic and NOTHING to do where you plan to develop and deploy your application, be it BTP-based or non-BTP.
- For BTP-based: You can always Establish trust to your new IAS Tenant from any BTP subaccount in any BTP DC, provided: Cost center and BTP universe (Canary or "Live") are the same. I,e Cost Center and landscape of the subaccount in which you created the IAS tenant are the same like for the subaccount you create trust. And no, not even the Global Account must be the same; just the cost center and universe.
- You'll see more details below, but just to state it already here: You may use one SCI Tenant for multiple deployments or PoC you do, in various subaccounts or LoB-deployments, independent of their physical location.

## Integrating with BTP Identity Broker

The service broker requires that there is trust between your subaccount and an SCI tenant. To achieve thus use the "Establish Trust" button in the cockpit (navigation: Security->Trust configuration). Trust can be established in new and existing subaccounts.

This assumes your subaccount and SCI tenant have been created under the same cost center. ![ias-trust.png](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/assets/images/ias-trust-4020bddcb49fb620f4dbd0d7fdafe915.png)

## Multi Tenant enabled SCI tenant

To create multi-tenant applications, which are required for subscriptions or reuse services, the tenant must be enabled for multi-tenancy, using the approach documented in the respective chapter of the documentation above. In case you want to change an existing tenant please create a BCP ticket on BC-IAM-IDS.

To check whether tenant has been configured for multi tenancy, you can check in the application inside the SCI tenant. If the tenant is multi-tenant-enabled, then you will see an option to enable/disable the multitenant application flag as you can see in the following screenshot.

![multitenancy.png](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/assets/images/multitenancy-fbf3b52b22ee29b246b4746c9134b288.png)

## SCI Tenants During Development

Please observe the following aspects for your IAS-based development and testing:

> - Do not develop and test your multi-tenant application in the same IAS tenant. Since this cannot occur in production, this setup is unsupported and we provide no support for it.
> - During PoC / dev-related tests, request a test IAS tenant in the same IAS data center as your provider IAS tenant (as indicated above). The test tenant does not need to be multi-tenant. Changes to your application in the provider IAS tenant are replicated immediately to the test IAS tenant when both are in the same DC; for IAS tenants in other DCs, replication can take up to 24 hours. Please consider this during production. That is, any change you perform for your application in its provider IAS Application / `identity` instance might take up to 24 hours till its present also in your customer's IAS. This means, you maybe must control how you perform your deployments in order to avoid outages: First the changes to the provider IAS Application and 24h later the code using it.
> - For BTP-based development, note that all BTP Canary DCs can only establish trust to IAS tenants obtained in a Canary subaccounts; likewise, BTP Production ("live") landscapes can only establish trust to IAS tenants obtained in "live" subaccounts.
> - For integration tests in your pipeline and for customers, IAS tenants can be located anywhere and do not need to be in the same data center as the application tenants or your production IAS tenant. However, they must be in the same IAS landscape: Canary or "live", and not mixed.

## SCI Tenants in Production

LoB applications can only be provisioned in an SAP-managed model. According to [INTG-02R1](https://wiki.one.int.sap/wiki/display/PSITG/INTG-02R1) and [INTG-02R2](https://wiki.one.int.sap/wiki/display/PSITG/INTG-02R2), they must do SSO via the customer's IAS tenant. By default, each customer gets 2 IAS tenants: one for production and one for non-production activities. They may purchase further tenants, too. So the rule is: each LoB Tenant used by a customer must be connected to one of the customer's IAS Tenants; More precisely, according to our [CIO Guide](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/Getting-Started/CIO) all productive LoB tenants should be connected to **the same** IAS Tenant.

In BTP, we have 2 provisioning and integration models:

- customer-managed (legacy applications)
- SAP-managed

In the case of customer-managed, it's the customer's responsibility to establish trust between a subaccount of theirs and an IAS tenant they own. All applications subscribed in that subaccount will thus use the same IAS tenant for doing authN / authZ.  
In the case of SAP-managed tenants, the same rule applies: When provisioning a tenant for a certain customer in an SAP-managed subaccount, the subaccount must trust one of the customer's IAS Tenants according to the customer's decision. No other approach for SAP-managed provisioning is supported. If you think this rule does not work for your application, please feel free to [contact us](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/Support).  
For SAP-managed cases, *your* subaccount must establish trust to *customer's* SCI Tenant. As this is generally not possible, the acceptable uses cases must request being added on an [allow-list](https://github.tools.sap/cloudfoundry/xsuaa-configurations/tree/master).

## FAQ

### IAS Tenant in China

The provider IAS tenant for Multi-tenant application (aka multi-tenant IAS Tenant) must be in the DC mentioned above like for other Public Cloud locations. It may even be the same one you already have for the other deployments of your application.  
The provider IAS tenant for Single Tenant applications is recommended to be located in China already, and you can provision it [as documented](https://wiki.one.int.sap/wiki/spaces/idservice/pages/1626014896/How+to+Request+a+Tenant+of+Identity+Authentication+Service).

### Who owns the provider IAS tenant?

The provider IAS tenant is owned by the application provider team. It is in the teams responsibility to manage access and security configuration.

On BTP, the provider subaccount establishes trust with the provider IAS tenant. By default, there will be two IdP for authentication: SAP ID Service (can be disabled) and the provider IAS tenant. If authentication is using SAP ID Service and interaction with the provider IAS tenant is only using identity broker, the credentials for accessing the provider tenant can be locked away.

### Why is the provider tenant only connected to certain CF regions?

This was a design decision for simplicity. As it is only used for defining the application and not used at runtime, offering the service in only one DC is assumed to be sufficient.

### I already have a tenant. Can I enable multi tenancy?

If you already have a tenant and want to keep it, it can be changed to support multi tenancy. Prerequisite is that the tenant is in the Rot DC. You can [open a ticket](https://wiki.one.int.sap/wiki/display/idservice/Support) to move the tenant (if needed) and enable multi tenancy.

### I deployed my application to muliple BTP landscapes, how can I distinguish the provider applications?

If a multi-tenant application is deployed to several BTP landscapes (e.g. eu10, eu20...) it might be hard to distinguish the provider applications in IAS, as they all share the same display name. In this case you can set an unique application name (`name` parameter) to make them easily identifiable.

### What is the IAS HA setup?

Identity Authentication is a multi-tenant system where tenants share the hardware and software and use dedicated (and isolated) database instances for persistence ([documentation](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/disaster-recovery-high-availability:)). It is provided in multiple regions, depending on the region either in a single DC with multiple availability zones or in a multi-DC setup for disaster recovery.

For multi-tenant applications, the provider tenants are in Europe in the SAP datacenters Netherlands (Amsterdam) / Germany (Frankfurt) as a multi-region setup. Data is replicated to consumer tenants. As this is an async replication job, failure of both DCs of the provider tenant will still allow the consumer IAS tenant to operate.

There is no plan to offer replication of provider tenants from other regions as Europe due to complexity reasons.