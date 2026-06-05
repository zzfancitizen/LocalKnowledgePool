---
title: "Reverse Payments and Postings from TRM Transactions (1) - via Reversal of Transaction"
source: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/reverse-payments-and-postings-from-trm-transactions-1-via-reversal-of/ba-p/13864622"
author:
  - "[[JustinZheng]]"
published: 2024-09-13
created: 2026-05-18
description: "Foreword This article Introduces how to reverse payments and postings for cash flows from financial transactions created in Treasury and Risk Management (TRM) solution"
tags:
  - "clippings"
---
[4 Likes](https://community.sap.com/t5/kudos/messagepage/board-id/erp-blog-sap/message-id/57834/tab/all-users "Click here to see who liked this post")

4,683

**Foreword**

This article Introduces how to reverse payments and postings for cash flows from financial transactions created in Treasury and Risk Management (TRM) solution of S/4HANA Public Cloud, **via reversal of transaction**.

Notes:

- This article only introduces the reversal of payments and postings for operative flows (which is relevant to payment) in financial transactions. Reversal of payments and postings of cash flows arising from securities account management (SAM) is not covered by this article.
- This article only introduces the cases that payment request is generated for payment relevant flows. Reversal of payment for vendor/customer is not covered by this article.
- To enhance readability, this article utilizes transaction codes (such as TBB1, TPM10, TPM13) wherever possible, instead of mentioning the full application names.

**Introduction**

To reverse the payment and posting for a fixed flow of OTC transaction, sometimes you have to ‘reverse’ the financial transaction itself and revert it to the previous activity (e.g. from activity category 'Contract Settlement' to 'Contract').

Usually this method must be used for reversal of the following flows (but not limited to them):

| *Product Category of Transaction* | *Cash Flow* | *Processing Cat. of Transaction Type* | *Activity Category Change thru. Reversal of Transaction* |
| --- | --- | --- | --- |
| 550 - Interest Rate Instrument | Initial principal increase (at the inception of transaction) | 00002 - With Settlement | from 'Contract Settlement' to 'Contract' |
| 600 - FX Transaction | Buy / sell foreign exchange | 00101 - Order - Contract – Settlement | from 'Contract Settlement' to 'Contract' |
|  | Cash settlement of Deliverable Forward | 00101 - Order - Contract – Settlement | from 'Contract Settlement' to 'Contract' |
|  | Cash settlement of Non-deliverable Forward | 00121 - Order - Contract - Settlement - Fixing - Settlement | from 'Fixing Settlement' to 'Fixing’ |
| 760 - OTC Options | Premium | 00101 - Order-Contr.-Settlmnt-Exer./Expir.-Settlmnt-Termintn-TSettl. | from 'Contract Settlement' to 'Contract' |
|  | Cash settlement (for exercised option) | 00101 - Order-Contr.-Settlmnt-Exer./Expir.-Settlmnt-Termintn-TSettl.  00102 - Order - Contract - Exercise/Expriration - Settlement | from 'Exercise Settlement' to 'Exercise' |
| 850 - Letter of Credit | Payment Obligation | 00001 - Without Settlement  00002 - With Settlement | from 'Settled' to 'Accepted'/’Draft’ for specific presentation\* |
|  | Acceptance Payment | 00001 - Without Settlement  00002 - With Settlement | from 'Settled' to 'Accepted'/’Draft’ for specific presentation\* |

\* In a strict sense, reversing the presentation status of Letter of Credit is not reverting to the previous activity of transaction.

**Example:**

1. A transaction for Interest Rate Instrument (product category 550) has been created, it is now with activity category ‘Contract Settlement’.
2. The payment request for the flow of initial principal increase (flow type 1100-) has been generated via TBB1 or TBB1\_PAY, but payment request has not been processed by F111 (payment request is ‘open’).
3. The postings for the position flows of initial principal increase (update type MM1100-) have been carried out via TBB1 or TPM10 for all valuation areas.
4. Accounting clerk realizes that the G/L account used for recognizing initial principal increase is incorrect, and the house bank/account ID used in payment request is incorrect, therefore the relevant postings and payment request should be reversed.

TM\_53:

![JustinZheng_0-1726207203372.png](https://community.sap.com/t5/image/serverpage/image-id/165887iB2DF22DA52B31A11/image-dimensions/761x244?v=v2 "JustinZheng_0-1726207203372.png")

F8BT: payment request is ‘Open’.

![JustinZheng_1-1726207203376.png](https://community.sap.com/t5/image/serverpage/image-id/165889i553F4ED5114147A7/image-dimensions/764x428?v=v2 "JustinZheng_1-1726207203376.png")

![JustinZheng_2-1726207203386.png](https://community.sap.com/t5/image/serverpage/image-id/165888iCD9B15078D7535A9/image-dimensions/759x387?v=v2 "JustinZheng_2-1726207203386.png")

TPM13: status of position flows (in all valuation areas) of the initial principal increase is ‘F’ (Fixed).

![JustinZheng_3-1726207203394.png](https://community.sap.com/t5/image/serverpage/image-id/165891iB53ACA77A00ABAF1/image-dimensions/752x250?v=v2 "JustinZheng_3-1726207203394.png")

TPM20: posting journal entries are available for the initial principal increase in all valuation areas.

![JustinZheng_4-1726207203399.png](https://community.sap.com/t5/image/serverpage/image-id/165892iC5EDE2B3899F2853/image-dimensions/760x181?v=v2 "JustinZheng_4-1726207203399.png")

TPM20A: payment journal has status ‘Created’.

![JustinZheng_5-1726207203402.png](https://community.sap.com/t5/image/serverpage/image-id/165890i4D84DD8321AC31E2/image-dimensions/757x89?v=v2 "JustinZheng_5-1726207203402.png")

**Target:**

Reverse the payment request and postings for this initial principal flow.

**Step-by-Step Guide:**

1\. Access app *Manage Financial Transactions*, identify the transaction number, and then choose the ‘ *Reverse’* option to revert this transaction to previous activity.

![JustinZheng_6-1726207203409.png](https://community.sap.com/t5/image/serverpage/image-id/165895iA413AF73771CF5A4/image-dimensions/758x268?v=v2 "JustinZheng_6-1726207203409.png")

On the next screen, choose *Enter*.

![JustinZheng_7-1726207203412.png](https://community.sap.com/t5/image/serverpage/image-id/165894i5FDC1E73985424D5/image-dimensions/742x379?v=v2 "JustinZheng_7-1726207203412.png")

On the next screen, select a *Reversal Reason*, and then choose *Save*.

![JustinZheng_8-1726207203419.png](https://community.sap.com/t5/image/serverpage/image-id/165893i678016E088EF5E82/image-dimensions/761x388?v=v2 "JustinZheng_8-1726207203419.png")

2\. Check in TM\_53: this transaction has been reverted to previous activity category ‘Contract’, and the Fixing Status, Payment Status, Posting Status of cash flow has returned to initial statuses.

![JustinZheng_9-1726207203424.png](https://community.sap.com/t5/image/serverpage/image-id/165896i30975FDC1AC49C46/image-dimensions/749x231?v=v2 "JustinZheng_9-1726207203424.png")

TPM13: previously ‘F’ (fixed) position flows have the status ‘ToR’ (To be Reversed) now.

![JustinZheng_10-1726207203434.png](https://community.sap.com/t5/image/serverpage/image-id/165897i59A35B4B9BF7920F/image-dimensions/749x293?v=v2 "JustinZheng_10-1726207203434.png")

3\. Assess TPM10, enter the necessary parameters, and choose *Run*.

![JustinZheng_11-1726207203441.png](https://community.sap.com/t5/image/serverpage/image-id/165898i2B4619B821F1B9C2/image-dimensions/748x552?v=v2 "JustinZheng_11-1726207203441.png")

On the next screen, choose *Execute*.

![JustinZheng_12-1726207203445.png](https://community.sap.com/t5/image/serverpage/image-id/165899i661F81D5E325F702/image-dimensions/745x252?v=v2 "JustinZheng_12-1726207203445.png")

Check posting and payment reversal logs and messages.

![JustinZheng_13-1726207203448.png](https://community.sap.com/t5/image/serverpage/image-id/165900iC16D4A5D1D2A1C68/image-dimensions/745x205?v=v2 "JustinZheng_13-1726207203448.png")

![JustinZheng_14-1726207203456.png](https://community.sap.com/t5/image/serverpage/image-id/165901i83D96C7CB2708C6C/image-dimensions/746x440?v=v2 "JustinZheng_14-1726207203456.png")

![JustinZheng_15-1726207203458.png](https://community.sap.com/t5/image/serverpage/image-id/165903iC07DBF0EFDC9058F/image-dimensions/745x95?v=v2 "JustinZheng_15-1726207203458.png")

(you can see similar information in TPM20A)

4\. Check in F8BT: now the payment request can only be displayed when ‘Cleared’ option is selected.

![JustinZheng_16-1726207203461.png](https://community.sap.com/t5/image/serverpage/image-id/165904iE46BAE618CADAB48/image-dimensions/728x405?v=v2 "JustinZheng_16-1726207203461.png")

This payment request is now flagged with Reverse = “X“, and this payment request can no longer be processed by F111.

![JustinZheng_17-1726207203468.png](https://community.sap.com/t5/image/serverpage/image-id/165902i0F36BEBFA0DE4FBA/image-dimensions/727x369?v=v2 "JustinZheng_17-1726207203468.png")

Check in TPM13: now relevant position flows have status ‘R’ (Reversed)

![JustinZheng_18-1726207203477.png](https://community.sap.com/t5/image/serverpage/image-id/165906iD28387DEACEBF6CA/image-dimensions/748x288?v=v2 "JustinZheng_18-1726207203477.png")

Check in TPM20: reversal journal entries have been created.

![JustinZheng_19-1726207203496.png](https://community.sap.com/t5/image/serverpage/image-id/165907iB6F0CFBD5A6EE72A/image-dimensions/744x248?v=v2 "JustinZheng_19-1726207203496.png")

Click the Object Key, the detailed journal entry will be displayed in another screen.

Original (reversed) journal entry in leading ledger:

![JustinZheng_20-1726207203504.png](https://community.sap.com/t5/image/serverpage/image-id/165905i9E9508263417BB27/image-dimensions/753x364?v=v2 "JustinZheng_20-1726207203504.png")

Reversal journal entry in leading ledger:

![JustinZheng_21-1726207203512.png](https://community.sap.com/t5/image/serverpage/image-id/165908i0C5B9B0A94C65F2F/image-dimensions/752x378?v=v2 "JustinZheng_21-1726207203512.png")

5\. After the postings and payment request are reversed, configuration expert fixes the G/L account determination configuration, and front office fixes the house bank/account ID to be used in this transaction. The next step is to settle the transaction again (which can be done in app *Manage Financial Transactions*), and re-run TBB1\_PAY / TBB1 / TPM10 to generate payment request and postings again. As this is not the focus of this article, further elaboration is not provided here.

**Caution:**

This method (via reversal of transaction) should be applied judiciously.

For instance, once a transaction is reversed and its activity category shifts from 'Contract Settlement' back to 'Contract', usually all associated fixed position flows in this transaction will have the 'ToR' (To Be Reversed) status (can check in TPM13), these position flows will then require reversal via TPM10, which may inadvertently result in the reversal of flows that are unnecessarily to be reversed.

To accurately identify and reverse the specific flow(s) in a transaction (when it is possible), please refer to the article [Reverse Payments and Postings from TRM Transactions (2) - via Reversal of Specific Cash Flow](https://community.sap.com/t5/enterprise-resource-planning-blogs-by-sap/reverse-payments-and-postings-from-trm-transactions-2-via-reversal-of/ba-p/13864660) for detailed guidance.

Top liked authors

| Count |
| --- |
| 13 |
| 11 |
| 11 |
| 11 |
| 11 |
| 10 |
| 9 |
| 8 |
| 8 |
| 8 |