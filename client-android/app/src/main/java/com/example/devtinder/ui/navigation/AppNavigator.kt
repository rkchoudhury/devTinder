package com.example.devtinder.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.devtinder.presentation.dashboard.DashboardScreen
import com.example.devtinder.presentation.login.LoginScreen
import com.example.devtinder.presentation.signup.SignUpScreen

@Composable
fun AppNavigator() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "Login") {
        composable(Route.LogIn.name) { LoginScreen(navController) }
        composable(Route.SignUp.name) { SignUpScreen() }
        composable(Route.Dashboard.name) { DashboardScreen() }
    }
}