package com.example.devtinder.ui.navigation

sealed class Route (val name: String) {
    object LogIn: Route("logIn")
    object SignUp: Route("signUp")
    object Dashboard: Route("dashboard")
}