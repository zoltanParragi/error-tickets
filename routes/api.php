<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Ticket;
use App\Models\Client;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function(Request $request) {
    $result = Auth::attempt(['email'=>$request->email, 'password'=>$request->password]);

    if( !$result) {
        return response(['status'=>'error', 'message'=>__('Sikertelen belépés!')]);
    } else {
        return response(['status'=>'success', 'user'=> Auth::user()]); 
    }
})->name('login');

Route::get('/logout', function() {
    Auth::logout();
    return response(['status'=>'success']);
})->name('logout');

Route::post('/addticket', function(Request $request) {
    try {
    $validated = $request->validate([
        'name' => 'required|min:3|max:30|exists:clients,name', 
        'email' => 'required|email|min:3|exists:clients,email',
        'subject'=> 'required|min:3|max:200',
        'content'=> 'required|min:5|max:1000',
    ]);
    } catch (ValidationException $e) {
        return response(['errors'=>$e->errors()], 422);
    }

    Ticket::create($validated);

    return response(['status'=>'success']);
})->name('addticket');

Route::get('/getclients', function() {
    $clients = Client::get();
    return response(['clients'=> $clients]);
})->name('getclients');

Route::get('/gettickets', function() {
    $tickets = Ticket::get();
    return response(['tickets'=> $tickets]);
})->name('gettickets');



/* 
Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::post('/logout', [App\Http\Controllers\Api\LoginController::class, 'logout']);
        Route::post('/me', [App\Http\Controllers\Api\LoginController::class, 'me']);
    });

*/
