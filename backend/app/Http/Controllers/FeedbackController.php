<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event_Feedback;

class FeedbackController extends Controller
{
    public function index()
    {
        return Event_Feedback::all();
    }

    public function show($id)
    {
        return Event_Feedback::find($id);
    }

    public function store(Request $request)
    {
        return Event_Feedback::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $event_feedback = Event_Feedback::findOrFail($id);
        $event_feedback->update($request->all());

        return $event_feedback;
    }

    public function delete(Request $request, $id)
    {
        $event_feedback = Event_Feedback::findOrFail($id);
        $event_feedback->delete();

        return 204;
    }
}
