/*******************************************************************************
 * Franck Binard, Innovation Science and Economic Development Canada (ISED)
 * franck.binard@canada.ca
 * don.vo@canada.ca
 * 
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * -----------------------------------------------------------------------------
 *  features.js : feature system
 *
 ******************************************************************************/

 
class Feature {

    constructor( options ){
        this.label          = options.label
        this.implemented    = options.implemented || false
        this.method         = options.method || false
    }

}

function AppComponent( componentDefinition ){

    this.label = componentDefinition.label
    let _features = new Map()

    if('methods' in componentDefinition) {
        Object.keys(componentDefinition.methods).forEach(
            (key, index)=>{
                if(key === 'configure') return
                _features[key] = true
                this[key] = componentDefinition.methods[key]
            })
    }

    this.addFeature =  function(feature){
        if(!('label' in feature)) throw 'error in feature definition'
        if(_features.has(feature.label)) throw "feature already exists"
        _features.set( feature.label, feature)
        if('method' in feature) this[ feature.label ] = feature.method
    }
}

const featureSystem = function( app ){

    let _features       = new Map()
    let _components     = new Map()
    let _reqMajor       = 0
    let _requirements   = new Map()

    return {

        get list()  {
            let features = {}
            _features.forEach((value, key)=>{
                features[key] = value
            })
            return features
        },

        implements  : featureLabel => _features.has(featureLabel), 

        addRequirement  : function({
            req, 
            parentReq
        }) {
            if( parentReq === undefined || parentReq === null){
                _reqMajor += 1
                _requirements.set(  _reqMajor, req)
            }
        },

        includes: featureName => {
            if(_features.has(featureName)) return _features.get(featureName)
            return false
        },

        addComponent : function( componentInfo ){
            let newComponent = new AppComponent( componentInfo )
            _components.set(newComponent.label, newComponent)
            app[newComponent.label] = newComponent 
        }, 

        add : function( feature ){
            if(!('label' in feature)) throw 'error in feature definition'
            if(_features.has(feature.label)) throw "feature already exists"
            _features.set( feature.label, feature)
            if('method' in feature) app[ feature.label ] = feature.method
        }
    }
}

const addFeatureSystem = function( app ){

    app.featureSystem = featureSystem( app )
    return app
}

module.exports = {
    addFeatureSystem
}