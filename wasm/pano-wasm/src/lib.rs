extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
use js_sys::*;
use std::f32::consts::*;

#[wasm_bindgen]
extern{
    #[wasm_bindgen(js_namespace=console)]
    pub fn log(s: &str);
}

const FUNCTIONS : [& dyn Fn(u32, u32, u32)->(f32, f32);6] = [
    &|i, j, half|->(f32, f32){//right
        let x = half as i32; let y = (i - half) as i32; let z = (half - j) as i32;
        let r = ((z*z + x*x + y*y) as f32).sqrt();
        let mut phi = (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 0.75;
        let theta = (z as f32 / r).acos() * FRAC_1_PI;
        if phi < 0.0 { phi = 1.0 + phi; };
        if phi > 1.0 { phi = phi - 1.0; };
        (phi, theta)
    },
    &|i, j, half|->(f32, f32){//back
        let x = half as i32; let y = (i - half) as i32; let z = (half - j) as i32;
        let r = ((z*z + x*x + y*y) as f32).sqrt();
        let mut phi = (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 1.0;
        let theta = (z as f32 / r).acos() * FRAC_1_PI;
        if phi < 0.0 { phi = 1.0 + phi; };
        if phi > 1.0 { phi = phi - 1.0; };
        (phi, theta)
    },
    &|i, j, half|->(f32, f32){//left
        let x = half as i32; let y = (i - half) as i32; let z = (half - j) as i32;
        let r = ((z*z + x*x + y*y) as f32).sqrt();
        let mut phi = (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 0.25;
        let theta = (z as f32 / r).acos() * FRAC_1_PI;
        if phi < 0.0 { phi = 1.0 + phi; };
        if phi > 1.0 { phi = phi - 1.0; };
        (phi, theta)
    },
    &|i, j, half|->(f32, f32){//front
        let x = half as i32; let y = (i - half) as i32; let z = (half - j) as i32;
        let r = ((z*z + x*x + y*y) as f32).sqrt();
        let mut phi = (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 0.5;
        let theta = (z as f32 / r).acos() * FRAC_1_PI;
        if phi < 0.0 { phi = 1.0 + phi; };
        if phi > 1.0 { phi = phi - 1.0; };
        (phi, theta)
    },
    &|i, j, half|->(f32, f32){//top
        let z = half as i32; let x = (i - half) as i32; let y = (half - j) as i32;
        let r = ((z*z + x*x + y*y) as f32).sqrt();
        let mut phi = if x > 0 { (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 1.0 }
                 else if x < 0 { (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 0.5 }
                          else { if y > 0 {0.25} else {0.75} };
        let theta = (z as f32 / r).acos() * FRAC_1_PI;
        if phi < 0.0 { phi = 1.0 + phi; };
        if phi > 1.0 { phi = phi - 1.0; };
        (phi, theta)
    },
    &|i, j, half|->(f32, f32){//buttom
        let z = -(half as i32); let x = (i - half) as i32; let y = (half - j) as i32;
        let r = ((z*z + x*x + y*y) as f32).sqrt();
        let mut phi = if x > 0 { (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 1.0 }
                 else if x < 0 { (y as f32 / x as f32).atan() * FRAC_1_PI * 0.5 + 0.5 }
                          else { if y > 0 {0.75} else {0.25} };
        let theta = (z as f32 / r).acos() * FRAC_1_PI;
        if phi < 0.0 { phi = 1.0 + phi; };
        if phi > 1.0 { phi = phi - 1.0; };
        (phi, theta)
    }
];

#[wasm_bindgen]
pub fn slice(origin: &Uint8ClampedArray, width: u32, height: u32, outputsize: u32, result_buf: &Uint8ClampedArray, pos: usize){
    let half = outputsize / 2;
    for i in 0..outputsize {
        for j in 0..outputsize {
            let (phi, theta) = FUNCTIONS[pos](i, j, half);
            let u = (phi * width as f32) as u32;
            let v = (theta * height as f32) as u32;
            let group_index = v * width + u;
            let result_index = j * outputsize + i;

            result_buf.set_index(result_index*4, origin.get_index(group_index*4));
            result_buf.set_index(result_index*4 + 1, origin.get_index(group_index*4 + 1));
            result_buf.set_index(result_index*4 + 2, origin.get_index(group_index*4 + 2));
            result_buf.set_index(result_index*4 + 3, origin.get_index(group_index*4 + 3));
        }
    }
}
