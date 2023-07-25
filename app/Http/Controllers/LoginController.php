<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    function login(Request $request) {
        $result = Auth::attempt(['email'=>$request->email, 'password'=>$request->password]);

        if( !$result) {
            return response(['status'=>'error', 'message'=>__('Sikertelen belépés!')]);
        } else {
            return response(['status'=>'success', 'user'=> Auth::user()]); 
        }
    }

    function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response(['status'=>'success']);
    }
}
