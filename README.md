# APICan

APICan is API store management software to support the operations of the Canada API store https://api.canada.ca/en/homepage, a service provided and maintained by ISED. The Canada API store is the main hub for rest APIs, both public and internal to GoC. Each participating department is a 'tenant' and publishes and manages its APIs through the ISED API store. Each tenant is associated with a 3Scale account. 

APICan interacts with the following connected systems:

- Jira (Atlassian) for support requests
- keyCloak for authentication
- 3Scale for tenant management
- The canada API store, hosted on a drupal platform

It provides various tools to api store administrators within and outside ISED that facilitate the management of the Canada API store with respect to its various components, including: 

- its users
- its tenants
- its services


 * Front-end: 
 * - js code compiles with browserify into public/javascripts/bundle.js
 * - js code for front-end is in ./src/client, uses jquery and 
 *   a other front-end libraries (see ./view/partials/head/jsLibraries)
 * - template engine is handlebars, templates are stored in ./views
 *
 * Back-end: 
 * - uses an express stack
 * - mongodb database
 *
 * Security: 
 * - uses keycloak authentication
 *   does not store any user information
 * - only accepts requests from whitelisted ips
 * 
 * Code tree: 
 * src
 * src/server
 * - httpServer
 * - routingSystem
 * src/user
 * src/client
 * - main.js
 * src/apiCan
 * - appFeatures
 * - appStatus
 * src/security
 * src/errors
 ******************************************************************************/
"
