<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Ticket;
use App\Models\Client;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\GetdataController;

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

Route::post('/login', [LoginController::class, 'login'])->name('login');

Route::post('/addticket', [TicketController::class, 'addticket'])->name('addticket');

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/getclients', [GetdataController::class, 'getclients'])->name('getclients');

    Route::get('/gettickets', [GetdataController::class, 'gettickets'])->name('gettickets');

    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
});

