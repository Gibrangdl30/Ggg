import axios from 'axios';

const state = {
    onlyCam: 0,
};

const getters = {
    onlyCam(state){ return state.onlyCam; }
};

const mutations = {
    setOnlyCam(state, val){
        state.onlyCam = val;
    }
};

const actions = {
    getFotoFunction({state}, [fn]){
        let optionsCamera = {
            quality: 35,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            allowEdit:false,
        }
        navigator.camera.getPicture(
            (imageURI) =>{
                fn(imageURI);
            },
            (error)=>{
                console.log('error tomar imagenes', error);
            }, 
        optionsCamera);
  },

    selectFotoFunction({state}, [fn]){
        let optionsCamera = {
            quality: 35,
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit:false,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum:false,
            correctOrientation: true
        }
        navigator.camera.getPicture(
            (imageURI) =>{
                fn(imageURI);
            },
            (error)=> {
                console.log('error tomar imagenes', error);
            }, 
            optionsCamera);
    },

    checarPermisosLocation({state}, {callback}){
        callback();
        return;
        
        let permissions = cordova.plugins.permissions;
        console.log("READY DEVICE", this.getters.deviceReady, typeof permissions, typeof permissions != 'undefined' ,  this.getters.deviceReady && typeof permissions != undefined  );
        if( this.getters.deviceReady && typeof permissions != undefined ){
            permissions.hasPermission(permissions.ACCESS_FINE_LOCATION, (status)=>{
                console.log("ESTATUS ESTATUS", status);
                if (!status.hasPermission) {
                    swal("","Para continuar, debes activar tu ubicación", "");
                }
                else{
                    callback();
                }
            }, ()=>{
                console.log("NO SE OBTUVO INFORMACION");
            });
        }else{
            callback();
        }
    },

    saveGallery({state}, img){
        let x = `https://paparatzapp.com/apiv1/api/img/directrender/${img.id}/foto.jpg`;
        this.dispatch('openBrowser', x);

        // let url = `data:${img.mime};base64,${img.base}`;
        // console.log("INICIADNO DESCARGA", url);
        // cordova.base64ToGallery(url, {
        //         prefix: 'papara',
        //     },
        //     (path)=>{
        //         console.log("SUCCESS");
        //         console.log(path);
        //     },
        //     (err)=>{
        //         console.log("ERROR");
        //         console.log(err);
        //         console.error(err);
        //     }
        // );
    },

    reviewPermissions({state},[callback]){
        if (!!cordova.plugins.permissions){
            let permissions = cordova.plugins.permissions;
            let permissionRequirements = 3;
            permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, successRES, error);
            permissions.hasPermission(permissions.CAMERA, successC, error);
            permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, successWES, error);
            function error() {
                swal(noPermissionMessage)
            }
            function successRES(){
                if (!status.hasPermission) {
                    permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, success, error)
                } else {
                    success()
                }
            }
            function successC(){
                if (!status.hasPermission) {
                    permissions.requestPermission(permissions.CAMERA, success, error)
                } else {
                    success()
                }
            }
            function successWES(){
                if (!status.hasPermission) {
                    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, success, error)
                } else {
                    success()
                }
            }
            let success =(status) => {
                permissionRequirements--
                if (permissionRequirements == 0) {
                    console.log("Permission requirements met.");
                    this.dispatch('recordVideo', [callback]);
                }
            }
        } 
    },
    tryRecordVideo({state}, [callback]){
        if (device.platform == 'Android'){
            this.dispatch('reviewPermissions', [callback]);
        } else {
            this.dispatch('recordVideo', [callback]);
        }
    },
    recordVideo({state},[callback]){
        let captureSuccess = (mediaFile) => {
            callback(mediaFile[0].fullPath);
        },
        captureError = (r) => {
            console.error(r)
        },
        options = {
            limit: 1,
            duration: 30,
            quality: 0
        }
        navigator.device.capture.captureVideo(captureSuccess, captureError, options);
    }


};

export default {
    state,
    getters,
    mutations,
    actions
};
