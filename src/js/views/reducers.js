import {combineReducers} from "redux";
import util from './_util/reducer.js';
import enums from "./_enums/reducer.js";
import user from "./user/reducer.js";
import brand from './brand/reducer.js';
import classification from './classification/reducer';
import specificationCategory from './specificationCategory/reducer';
import specification from './specification/reducer';
import spu from './spu/reducer';
import sku from './sku/reducer';
import serviceCategory from './serviceCategory/reducer';
import service from './service/reducer';
import coupon from './coupon/reducer';


export default combineReducers({
    util,
    enums,
    user,
    brand,
    classification,
    specificationCategory,
    specification,
    spu,
    sku,
    serviceCategory,
    service,
    coupon
})
