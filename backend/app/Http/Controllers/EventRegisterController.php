<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event_Register;

class EventRegisterController extends Controller
{
    public function index()
    {
        return Event_Register::all();
    }

    public function show($id)
    {
        return Event_Register::find($id);
    }

    public function store(Request $request)
    {
        return Event_Register::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $event_register = Event_Register::findOrFail($id);
        $event_register->update($request->all());

        return $event_register;
    }

    public function delete(Request $request, $id)
    {
        $event_register = Event_Register::findOrFail($id);
        $event_register->delete();

        return 204;
    }
}
