/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan
 * -------------------------------------
 *  tenants.js : Defines tenant class
 *  used in various parts of this application
 *
 ******************************************************************************/

"use strict"

/*****************************************************************************/
const utils = require('@src/utils').utils
const log = require('@src/utils').utils.log
const errHandle = require('@errors').errors.errorHandler
const accounts = require('@src/accounts').accounts
const TenantProto = require('@src/tenants/tenantProto').TenantProto

/*****************************************************************************/
const tenants = (function() {

    return {

       Tenant: class extends TenantProto {

            constructor(tenantJSONInfo, env) {
                super({
                    accessToken : tenantJSONInfo.access_token,
                    id          : tenantJSONInfo.id,
                    name        : tenantJSONInfo.name,
                    adminDomain : tenantJSONInfo.admin_domain
                })

                this.accounts = new Map() //indexed by email addresses

                this.lastUpdateTime = "not updated"
                this.maintainers = lang => lang ? this.maintainersEn : this.maintainersFr
                this.tenantDescription = lang => lang ? tenantJSONInfo.description_en : tenantJSONInfo.description_fr
                this.domain = tenantJSONInfo.domain
                this.visibleServices = []

                this.baseURL = `https://${this.adminDomain}/admin/api/`
                this.accountAdminBaseURL = {
                    services: `https://${this.adminDomain}/admin/api/services.json?access_token=${this.accessToken}`,
                    activeDocs: `${this.baseURL}active_docs.json?access_token=${this.accessToken}`,
                    userPlans: email => `${this.baseURL}accounts/find?access_token=${this.accessToken}&email=${encodeURIComponent(email)}`
                }
            }
        }
    }

})()

tenants.Tenant.prototype.apiJsonAnswer = function(language) {
    return {
        name: this.name,
        description: this.tenantDescription(language),
        maintainers: this.maintainers(language),
        apis: this.publicAPIList(language)
    }
}

tenants.Tenant.prototype.publicAPIList = function(language) {
    //returns an array of public services for this tenant
    let billingualApis =
        this.services.filter(
            service => service.documentation.size >= 2
        )
   return... 
}

tenants.Tenant.prototype.getAccountPlan = function(planInfo, userEmail) {
    let accountID, newAccount, planIDs
    if (planInfo === null) return null
    accountID = planInfo.account.id[0]
    newAccount = new accounts.Account(accountID, userEmail)
    //within the plans included with this user, 
    this.accounts.set(userEmail, newAccount)
    //only one has a plan of type "account_plan"
    //that's the one we need
    let accountPlan = planInfo.account.plans[0].plan.filter(plan => plan.type[0] === "account_plan")[0]
    //    planIDs = planInfo.account.plans[0].plan.map(plan => plan.id[0])
    //   newAccount.associatePlans(planIDs)
    return accountPlan
    //at this point, we only care abou tthe plan that has type: account_plan
    //1. get that account info
    //2. get the features for that account
    //so for 161, get feature 31, once that's in: 
    //extract the system name (in this case gc-internal)
    //k
}

tenants.Tenant.prototype.getUserApiInfo = async function(userEmail) {

    let accountPlans = new Promise((resolve, reject) => {
        this.getUserPlans(userEmail)
            .then(result => this.getAccountPlan(result, userEmail))
            .then(accountPlan => this.checkAccountPlanFeatures(userEmail, accountPlan))
            .then(x => resolve(x))
    })

}

tenants.Tenant.prototype.getAccounts = function() {
    return new Promise((resolve, reject) => {
        this.getAccountList()
            .then(function(accountList) {
                resolve(accountList.map(accObj => accObj.account))
            })
    })
}

tenants.Tenant.prototype.getProviderAccountUserList = function() {
    return new Promise((resolve, reject) => {
        this.getProviderAccountUsers()
            .then(x => {
                if (x === null) {
                    return resolve('invalid response')
                }
                return resolve(x.users)
            })
    })
}

module.exports = {
    tenants
}
