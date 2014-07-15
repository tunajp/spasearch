/*
 * util.js
 * 
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

module PXConfig from './config';

/**
 * trace_func
 * デバッグモード時にconsoleに文字列を出力する
 *
 * @param {string} str
 */
export function trace_func(str)
{
  if (PXConfig._DEBUG_MODE_) {
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    var dd = d.getMilliseconds();
    var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
    console.log(log_time + " " + str);
  }
}

