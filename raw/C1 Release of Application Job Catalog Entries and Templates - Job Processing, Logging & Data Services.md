---
title: "C1 Release of Application Job Catalog Entries and Templates - Job Processing, Logging & Data Services"
source: "https://wiki.one.int.sap/wiki/spaces/SI3/pages/4138699749/C1+Release+of+Application+Job+Catalog+Entries+and+Templates"
author:
  - "[[Eichmann]]"
  - "[[Holger]]"
published:
created: 2026-06-23
description:
tags:
  - "clippings"
---
Several SAP applications deliver application job catalog entries and templates to our customers. On this way they offer the possibility that an application report or class can be scheduled as application job via the application job Fiori app. Currently, no checks exist which ensure the technical stability of the delivered solutions. E.g., the application may change the parameters of the report which runs within the job. After this a periodic application job which uses this report and which was scheduled by a customer may suddenly terminate, after the changes have been implemented into the system. In a Cloud system this may lead to a Day 1 impact after an upgrade.

To prevent this situation we offer the possibility that an SAP application can release their job catalog entry using the C1 contract. If an application releases its application job catalog entry, it guarantees that no incompatible changes are made to the solution. This includes the delivered report / class which runs within the job, the check class which may be used by the catalog entry, and the catalog entry. In particular the following behavior should be ensured:

- If the customer scheduled a periodic job with any template which he created using the catalog entry, the job should not terminate after a change.
- If the customer wrote an ABAP class which schedules an application job using the scheduling API, the class should continue to work after a change.
- If the customer scheduled a periodic job with any template which he created using the catalog entry, the job should continue to return the expected results. The parameter values which the customer entered into the template should not be ignored or become corrupted after a change.

To ensure this the following checks of the report / class which is run within the job, and of the catalog entry were implemented. They will be processed if the catalog entry is C1 released. If a check fails, an ATC error is raised. The implemented checks do not check the coding of the report / class. It is the responsibility of the application which implemented the report / class to ensure that the coding is not changed in an incompatible way.

1\. Any change of the data type of a parameter which is defined in the report / class and which is used on the selection screen is not allowed. E.g. it is not allowed to change a parameter type from CHAR to type INT4.

Reasons:

- If the change of the data type is incompatible (e.g. from CHAR to INT4), a periodic application job may terminate e.g. if the parameter is filled with letters in a customer template and cannot be converted to a number.
- If the change is compatible, there may be parameter values which are converted to an unwanted result during the type conversion. E.g., if a date type is changed to a character type, a conversion is possible, but the result depends on the selected date format.

2\. The length and the number of decimal places of a parameter which is defined in the report / class must not be reduced. E.g. it is not allowed to change a parameter type from CHAR255 to CHAR32.

Reason: If the customer defined a template which uses the full size of the parameter, the parameter value would be cut off after the change leading to unexpected results.

3\. It is not allowed to change a parameter of the report from value ranges to single value. E.g., in a report this can be done by changing the parameter definition from SELECT-OPTIONS to PARAMETERS.

Reason: If the customer put "Excluding 'value'" into the value range, it is automatically converted to "Including 'value'" if the value range is changed to single value. This leads to unexpected results.

4\. Deleting of a parameter in the report / class which is used by the catalog entry is not allowed.

Reason: This change makes the catalog entry inconsistent (a check of the catalog entry shows an error). In addition, if the customer defined a value for this parameter in his templates, it is not used any more which may lead to unwanted results.

5\. It is not allowed to make a parameter of the report / class mandatory, or to create a new parameter in the report / class which is mandatory.

Reason: If a periodic job runs on the customer system which uses a template where the parameter is not filled, the job may terminate after the change.

6\. It is not allowed to change the assignment of the catalog entry to the report / class which is run within the job.

Reason: If a different report or class runs within the job, probably the behaviour of the job is changed which may lead to undesirable results.

7\. It is not allowed to delete the report / class which is used by the catalog entry.

Reason: If the report / class is deleted, a periodic job which tries to run this report / class terminates.

8\. It is not allowed to change the assignment of the catalog entry to the check class. This includes removing of the check class and inserting of a new check class.

Reason: A change of the check class probably means that also the checks are changed which are processed when a new job is scheduled. This may take care that the scheduling of a job via the scheduling API suddenly fails after this change. In addition, the user who schedules the job may be confused by the changed checks.

9\. Setting of the flag 'scoping relevant' in the catalog entry is not allowed.

Reason: If the flag 'scoping relevant' is set, the catalog entry and its templates are only available if an entry in the scoping tables is set. So, setting of the 'scoping relevant' flag may take care that the templates are suddenly not available for the customer any more.

10\. Deleting of a parameter in the catalog entry is not allowed.

Reason: This change makes all templates inconsistent which use this parameter (a check of the templates shows an error).

11\. Setting of the hidden flag in the parameter attributes of the catalog entry is not allowed. This includes making the parameter hidden in the report / class e.g. via ABAP addition NO-DISPLAY.

Reason: If a customer template uses this parameter, a copying of the template does not consider this parameter any more after the change which may lead to unexpected results.

12\. Setting of the read only flag in the parameter attributes of the catalog entry is not allowed.

Reason: If a customer template uses this parameter, a copying of the template does not consider this parameter any more after the change which may lead to unexpected results.

13\. It is not allowed to make a parameter of catalog entry mandatory, or to create a new parameter in the catalog entry which is mandatory.

Reason: The existing templates of the customer may not fill the parameter. So, the report / class may show unexpected behaviour, because after the change the report / class expects that the parameter is filled. In addition, if the customer schedules a job via the scheduling API, this may suddenly fail after the change if the parameter is not filled.

14\. Changing a parameter to a checkbox is not allowed. This can be done e.g. by adding the addition AS CHECKBOX to the PARAMETERS command.

Reason: The customer may have created a template which fills the parameter with a value which is not ABAP\_TRUE or ABAP\_FALSE. The change takes care that the value is converted which may lead to unexpected results.

15\. Changing a parameter to a radio button is not allowed. This can be done e.g. by adding the addition RADIOBUTTON GROUP to the PARAMETERS command.

Reason: The customer may have created a template which fills the parameter with a value which is not ABAP\_TRUE or ABAP\_FALSE. Or, he may have set more than one parameter of the new radio button group to ABAP\_TRUE. The change takes care that the value is converted which may lead to unexpected results.

16\. It is not allowed to change the field 'Spool Display' in the catalog entry from 'Generic spool display' to 'None'.

Reason: If 'Generic spool display' is selected, the customer can see the results of the job in the Fiori app via the display of the spool request which was created by the job. If the 'Spool Display' is changed to 'None', this is suddenly not possible any more.

17\. It is not allowed to change the field 'Log handling' in the catalog entry.

Reason: This setting selects which application log is displayed by the Fiori app. If it is changed, the application log may not be available any more.

In addition, an application has the possibility to release the template using the C1 contract. A template can be released if the catalog entry which is used by the template was already released using the C1 contract. If a template was released, the following checks of the template will be processed. If a check fails, an ATC error is raised.

1\. It is not allowed to change the assignment of the template to the catalog entry.

Reason: If a different catalog entry is used, probably the behaviour of the job is changed which may lead to undesirable results.

**Important:** The application jobs framework has been enabled for developer extensibility. Public Cloud customers can develop their own job templates, job catalog entries and the underlying business logic.  
Moreover we offer the C1-released API class CL\_APJ\_RT\_API, which has methods for all kinds of operations on application jobs. In particular this class has the method SCHEDULE\_JOB to schedule an application job template.  
Some customers have self-developed scenarios, where they want to schedule not only their own job templates, but also SAP job templates using this method. **This is only possible, if the SAP job template has been C1 released.**