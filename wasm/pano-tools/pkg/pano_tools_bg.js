import * as wasm from './pano_tools_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {Uint8ClampedArray} origin
* @param {number} width
* @param {number} height
* @param {number} outputsize
* @param {Uint8ClampedArray} result_buf
* @param {number} pos
*/
export function slice(origin, width, height, outputsize, result_buf, pos) {
    try {
        wasm.slice(addBorrowedObject(origin), width, height, outputsize, addBorrowedObject(result_buf), pos);
    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

function getObject(idx) { return heap[idx]; }

export const __wbg_getindex_4fc53919f2de8e77 = function(arg0, arg1) {
    var ret = getObject(arg0)[arg1 >>> 0];
    return ret;
};

export const __wbg_setindex_b35bc22e2f184ab1 = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = arg2;
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

