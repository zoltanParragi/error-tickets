<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Client;

class GetdataController extends Controller
{
    function getclients() {
        $clients = Client::get();
        return response(['clients'=> $clients]);
    }

    function gettickets() {
        $tickets = Ticket::get();
        return response(['tickets'=> $tickets]);
    }
}
