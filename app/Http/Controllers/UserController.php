<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return view('user.index');
    }

    public function show($id)
    {
        return view('user.show', ['id' => $id]);
    }

    public function create()
    {
        return view('user.create');
    }

    public function store(Request $request)
    {
        // Logic to store user data
        return redirect()->route('user.index');
    }
    public function edit($id)
    {
        return view('user.edit', ['id' => $id]);
    }
}
