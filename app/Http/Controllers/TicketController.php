<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class TicketController extends Controller
{
    function addticket(Request $request) {
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

    }
}
