import axios from 'axios';
const lastStorage = 'scanerstorage';

const initialState = {
    status: {
        active: false,
        ready: false,
        luz: false,
    },
};
const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    scanStatus(state){return state.status;}
};

const mutations={
    openEscaner(state){
        state.status.active = true;
        this.commit('changeView','escaner');
        if(!state.status.ready){
            state.status.ready = true;
            let callback = (err, text)=> {
                if(err){ console.error(err); } 
                else { 
                    this.commit('scanComplete',text); 
                }
            }
            QRScanner.scan(callback);
        }
        QRScanner.show();
    },
    cerrarEscaner(state){
        state.status.active = false;
        state.status.ready = false;
        this.commit('changeView', 'usuario');
        QRScanner.destroy((status) => {
            console.log("DESTRUYENDO escan",status);
        });
    },
    scan(state){
        state.status.ready = true;
        let callback = (err, text)=> {
            if(err){ console.error(err); } 
            else {
                this.commit('scanComplete',text);
            }
        }
        QRScanner.scan(callback);
    },
    enableLight(state){
        if(!state.status.luz){
            QRScanner.enableLight((err, status) =>{
                err && console.error(err);
                state.status.luz=true;
                console.log(status);
            });
        }
        else{
            QRScanner.disableLight((err, status)=>{
                err && console.error(err);
                console.log(status);
                state.status.luz=false;
            });
        }
    },
    cancelEscaner(state){
        QRScanner.destroy((status) => {
            state.status.active = false;
            console.log("DESTRUYENDO escan",status);
        });
    },
    scanComplete(state,texto){
        state.status.ready = false;
        this.dispatch('postCarritoGetServicio',[texto]);
       
    }
};

const actions={
};

export default {
    state,
    getters,
    mutations,
    actions
};