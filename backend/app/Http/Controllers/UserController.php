<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user_id)
    {
        return User::find($user_id);
    }

    public function store(Request $request)
    {
        return User::create($request->all());
    }

    public function update(Request $request, $user_id)
    {
        $user = User::findOrFail($user_id);
        $user->update($request->all());

        return $user;
    }

    public function delete(Request $request, $user_id)
    {
        $user = User::findOrFail($user_id);
        $user->delete();

        return 204;
    }
}
