import axios from 'axios';

const state = {

    res: {
        "deliveries": [
            {
                "deliveries": [
                    {
                        "image": true,
                        "courier": "99minutos",
                        "alias": "99minutos",
                        "courierId": "wallet_99minutos_0",
                        "serviceType": 2,
                        "serviceName": "NextDay",
                        "deliveryTimestamp": "2023-02-24T00:16:04.032Z",
                        "amount": 0,
                        "currency": "MXN",
                        "packageSize": "xs",
                        "insurance_availability": true,
                        "amount_insurance_courier": 100,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 66,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "Estafeta",
                        "alias": "estafeta",
                        "courierId": "wallet_estafeta_0",
                        "serviceName": "Terrestre",
                        "serviceType": 70,
                        "deliveryTimestamp": "2023-02-25T00:16:04.032Z",
                        "amount": 47,
                        "currency": "MXN",
                        "insurance_availability": true,
                        "amount_insurance_courier": 100,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "extended": 0,
                        "ocurre": 0,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 113,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "FedEx",
                        "alias": "fedex",
                        "courierId": "wallet_fedex_0",
                        "serviceType": "FEDEX_EXPRESS_SAVER",
                        "serviceName": "Express Saver",
                        "deliveryDayOfWeek": "WED",
                        "deliveryTimestamp": "2023-02-25T00:16:04.032Z",
                        "amount": 61,
                        "currency": "MXN",
                        "amount_insurance_courier": 100,
                        "insurance_availability": true,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 127,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "Estafeta",
                        "alias": "estafeta",
                        "courierId": "wallet_estafeta_0",
                        "serviceName": "Dia Sig.",
                        "serviceType": 60,
                        "deliveryTimestamp": "2023-02-24T00:16:04.032Z",
                        "amount": 65,
                        "currency": "MXN",
                        "insurance_availability": true,
                        "amount_insurance_courier": 100,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "extended": 0,
                        "ocurre": 0,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 131,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "FedEx",
                        "alias": "fedex",
                        "courierId": "wallet_fedex_0",
                        "serviceType": "STANDARD_OVERNIGHT",
                        "serviceName": "Standard Overnight",
                        "deliveryDayOfWeek": "TUE",
                        "deliveryTimestamp": "2023-02-23T00:16:04.032Z",
                        "amount": 72,
                        "currency": "MXN",
                        "amount_insurance_courier": 100,
                        "insurance_availability": true,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 138,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "FedEx",
                        "alias": "fedex",
                        "courierId": "wallet_fedex_0",
                        "serviceType": "PRIORITY_OVERNIGHT",
                        "serviceName": "Priority Overnight",
                        "deliveryDayOfWeek": "TUE",
                        "deliveryTimestamp": "2023-02-23T00:16:04.032Z",
                        "amount": 281,
                        "currency": "MXN",
                        "amount_insurance_courier": 100,
                        "insurance_availability": true,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 347,
                        "discount_ship": 66
                    }
                ],
                "products": [
                    {
                        "sku": "7503030036887",
                        "name": "Trío de Salsas Chiltipín de Fiesta Mexicana",
                        "free_shipping": 0
                    }
                ],
                "packages": [
                    {
                        "h": "20.00",
                        "w": "10.00",
                        "hh": "10.00",
                        "weight": "1.00",
                        "sizeUnit": "CM",
                        "weightUnit": "KG",
                        "declaredValue": 0
                    }
                ],
                "to_users_id": 10,
                "afiliate": "Fiesta Mexicana"
            },
            {
                "deliveries": [
                    {
                        "image": true,
                        "courier": "99minutos",
                        "alias": "99minutos",
                        "courierId": "wallet_99minutos_0",
                        "serviceType": 2,
                        "serviceName": "NextDay",
                        "deliveryTimestamp": "2023-02-24T00:16:04.518Z",
                        "amount": 0,
                        "currency": "MXN",
                        "packageSize": "xs",
                        "insurance_availability": true,
                        "amount_insurance_courier": 100,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 66,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "Estafeta",
                        "alias": "estafeta",
                        "courierId": "wallet_estafeta_0",
                        "serviceName": "Terrestre",
                        "serviceType": 70,
                        "deliveryTimestamp": "2023-02-25T00:16:04.518Z",
                        "amount": 47,
                        "currency": "MXN",
                        "insurance_availability": true,
                        "amount_insurance_courier": 100,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "extended": 0,
                        "ocurre": 0,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 113,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "FedEx",
                        "alias": "fedex",
                        "courierId": "wallet_fedex_0",
                        "serviceType": "FEDEX_EXPRESS_SAVER",
                        "serviceName": "Express Saver",
                        "deliveryDayOfWeek": "WED",
                        "deliveryTimestamp": "2023-02-25T00:16:04.518Z",
                        "amount": 61,
                        "currency": "MXN",
                        "amount_insurance_courier": 100,
                        "insurance_availability": true,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 127,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "Estafeta",
                        "alias": "estafeta",
                        "courierId": "wallet_estafeta_0",
                        "serviceName": "Dia Sig.",
                        "serviceType": 60,
                        "deliveryTimestamp": "2023-02-24T00:16:04.518Z",
                        "amount": 65,
                        "currency": "MXN",
                        "insurance_availability": true,
                        "amount_insurance_courier": 100,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "extended": 0,
                        "ocurre": 0,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 131,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "FedEx",
                        "alias": "fedex",
                        "courierId": "wallet_fedex_0",
                        "serviceType": "STANDARD_OVERNIGHT",
                        "serviceName": "Standard Overnight",
                        "deliveryDayOfWeek": "TUE",
                        "deliveryTimestamp": "2023-02-23T00:16:04.518Z",
                        "amount": 72,
                        "currency": "MXN",
                        "amount_insurance_courier": 100,
                        "insurance_availability": true,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 138,
                        "discount_ship": 66
                    },
                    {
                        "image": true,
                        "courier": "FedEx",
                        "alias": "fedex",
                        "courierId": "wallet_fedex_0",
                        "serviceType": "PRIORITY_OVERNIGHT",
                        "serviceName": "Priority Overnight",
                        "deliveryDayOfWeek": "TUE",
                        "deliveryTimestamp": "2023-02-23T00:16:04.518Z",
                        "amount": 281,
                        "currency": "MXN",
                        "amount_insurance_courier": 100,
                        "insurance_availability": true,
                        "minInsurance": 2500,
                        "maxInsurance": 30000,
                        "expectedDelivery": [
                            5
                        ],
                        "amount_org": 347,
                        "discount_ship": 66
                    }
                ],
                "products": [
                    {
                        "sku": "ALGalaVer2022",
                        "name": null,
                        "free_shipping": 0
                    }
                ],
                "packages": [
                    {
                        "h": "10.00",
                        "w": "10.00",
                        "hh": "10.00",
                        "weight": "1.00",
                        "sizeUnit": "CM",
                        "weightUnit": "KG",
                        "declaredValue": 0
                    }
                ],
                "to_users_id": 47,
                "afiliate": "Alhaja Dau"
            }
        ]
    },
    baseApi: 'https://mexicolimited.com/apiapp/',
    refreshToken: null,
    token: null,
};

const getters = {
    getEnToken(state){return state.token},
};

const mutations = {
    setEnState(state, [key,val]){
        state[key] = val;
    }
};

const actions = {

    postLoginApi({ commit, state }){
        return;
        
        let data = {
            email: 'alonso_torres71@hotmail.com',
            password: 'sustamwork',
        };
        let finish = (res)=>{
            console.log("RES RES RES", res);
            this.commit('setEnState',['refreshToken',res.refreshToken]);
            this.commit('setEnState',['token',res.token]);

            setTimeout(()=>{
                this.dispatch('postCotizaApi');
            }, 1000+4)
        };

        let load = {
            url: 'user/login',
            data: data,
        }
        this.dispatch('postApiRequest', load).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    postCotizaApi({ commit, state }){
        const ss = this.getters.getSession;
        const dom = this.getters.carritoFind('domicilios','domicilio');
        const car = this.getters.carritoObject('desgloce');
        const prods = car.carrito;

        
        let s =  {
            "name":         ss.nombre,
            "email":        ss.email,
            "lastname":     ss.nombre,
            "phone":        ss.telefono,

            "zipcode":          dom.cp,
            "neighborhood":     dom.colonia,
            "town_id":          dom.mun_id,
            "state_id":         dom.estado_id,
            "street":           dom.calle_nombre,
            "num_ext":          dom.numero,
        };

        if(this.getters.debugB){
            this.commit('setEnviosCarrito',{res: state.res});
        }
        
        let p = [];
        prods.map(x=>{
            p.push({
                "id": x.info.id,
                "quantity": x.cantidad,
                "modelo": null
            });
        });


        let data = {
            "products"  :p,
            "user"      :s,
        };

        let finish = (res)=>{
            console.log("RES RES RES ", res);
            this.commit('setEnviosCarrito',{res: res});
        };

        let load = {
            url: 'distance',
            data: data,
        }
        this.dispatch('postApiRequest', load).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    postSaveOrderApi({ commit, state }, {oId = {}}){
        const ss = this.getters.getSession;
        const dom = this.getters.carritoFind('domicilios','domicilio');
        const car = this.getters.carritoObject('desgloce');
        const prods = car.carrito;

        let s =  {
            "name":         ss.nombre,
            "email":        ss.email,
            "lastname":     ss.nombre,
            "phone":        ss.telefono,

            "zipcode":          dom.cp,
            "neighborhood":     dom.colonia,
            "town_id":          dom.mun_id,
            "state_id":         dom.estado_id,
            "street":           dom.calle_nombre,
            "num_ext":          dom.numero,
        };

        let p = [];
        let c = [];
        prods.map(x=>{
            p.push({
                "id":       x.info.id,
                "quantity": x.cantidad,
                "modelo":   null,
                "price":    x.total
            });

            c.push({
                "afiliate":             x.info.brand,
                "courier":              x.envio.nombre,
                "discount_ship":        x.envio.info.discount_ship? x.envio.info.discount_ship:'0',
                "envio":                x.envio.info.amount? x.envio.info.amount:'0',
                "serviceName":          x.envio.info.serviceName,
                "serviceType":          x.envio.info.serviceType,
                "to_users_id":          x.info.users_id,
            });
        });


        let data = {
            "products"  :p,
            "user"      :s,
            "couriers"  :c,
            "orders_id" :oId,
        };

        let finish = (res)=>{
        };

        let load = {
            url: 'saveship',
            data: data,
        }
        this.dispatch('postApiRequest', load).then(
        res => {
            finish(res);
        },error=>{});
    },
  

    postApiRequest({state}, {
        data = {},
        head = {},
        url = '',
        loader = 1,
        errorMsg = 1,
        alert = 1,
        customSwal = {},
        customAlert = 0,
        callback = 0,
    }){
        try{
            if(loader){
                this.commit('openModal',['loader']);
            }
            
            let headPost = {
                // 'content-type'                  : 'text/plain',
                'content-type'                  : 'application/json',
                'Weship-API-Version'            : '1.0',
                "Access-Control-Allow-Origin"   : "*",
            };

            headPost = {...headPost, ...head};

            if(this.getters.getEnToken){
                headPost['authorization'] = this.getters.getEnToken;
            }

            return new Promise((resolve, reject) => {

                console.log("AXIOS POST", state.baseApi + url, headPost );

                //axios.post( state.baseApi + url, data, { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                axios.post( state.baseApi + url, data, { headers: { 'content-type' : 'application/json' }, timeout: 5000000 }).then(
                        response=>{

                            console.log("RESPONSE CORRECTO", response.data);

                            if(loader){
                                this.commit('closeModal',['loader']);
                            }
                            
                            if(!response.data.success && 0){
                                if(errorMsg){
                                    if(response.data.msg == 'Incorrect password') {
                                        swal({title: response.data.msg, text:"", icon:"error", button: 'Try again'});
                                    }
                                    else if(response.data.msg == 'sorry') {
                                        swal({ title:"", text:"We are sorry, the phone number you entered is not registered in out platform", icon:"error", button:'Try again' });
                                    }
                                    else if(response.data.msg != 'Usuario inexistente') {
                                        swal(response.data.msg, "", "error");
                                    }
                                }
                                reject(response.data);
                                return;
                            }


                            if(alert && 0){
                                if(customSwal && customSwal.button){
                                    if(customSwal.text == 'res'){
                                        customSwal.text = response.data.msg;
                                    }
                                    swal(customSwal);
                                }
                                else if(customAlert){
                                    swal("",customAlert,"success");
                                }
                                else if(response.data.msg){
                                    swal("",response.data.msg,"success");
                                }
                                else{
                                    swal("","Información actulizada","success");
                                }
                            }

                            if(callback){
                                callback(response.data);
                            }
                            resolve(response.data);

                        },
                        error => {
                            // this.dispatch('synchronizeData');
                            if(loader){
                                this.commit('closeModal',['loader']);
                            }
                            console.log("RESPONSE", error);
                            if(error.err){
                                swal("", error.err, "error");
                            }else{
                                swal("","Fallo conexion al servidor", "error");
                            }
                            reject(error);
                        });
                    });
        }
        catch (e){
            // this.dispatch('synchronizeData');
            if(loader){
                this.commit('closeModal',['loader']);
            }
            console.log("ERROR",e);
        }
    },


};

export default {
    state,
    getters,
    mutations,
    actions
};
