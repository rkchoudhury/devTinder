package com.example.devtinder.presentation.login

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.paint
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.devtinder.R
import com.example.devtinder.data.model.LoginData
import com.example.devtinder.service.devTinderService
import com.example.devtinder.ui.components.TextInput
import com.example.devtinder.ui.navigation.Route

@Composable
fun LoginScreen(navController: NavController) {
    var login by remember { mutableStateOf(false) }

    LaunchedEffect(login) {
        if (login) {
            try {
                val data = LoginData("priti@gmail.com", "Priti@123")
                val response = devTinderService.authenticateUser(data)
                navController.navigate(Route.Dashboard.name)
            } catch (error: Exception) {
                Log.d("RKKKKKK", "LoginScreen: error " + error)
            } finally {
                login = false
            }

        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .paint(
                painter = painterResource(R.drawable.gradient_background),
                contentScale = ContentScale.Crop
            ),
    ) {
        Column(
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
        ) {
            Image(
                painter = painterResource(R.drawable.logo),
                contentDescription = null,
                modifier = Modifier.size(48.dp)
            )
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = "Dev Tinder",
                fontSize = 24.sp,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }
        Column(
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .weight(2f)
                .fillMaxWidth()
        ) {
            TextInput(label = "Email Id", keyboardType = KeyboardType.Email)
            TextInput(
                label = "Password",
                isPasswordInput = true,
                keyboardType = KeyboardType.Password
            )
            Button(onClick = { login = true }) {
                Text(text = "Log In")
            }
            Button(onClick = { navController.navigate(Route.SignUp.name) }) {
                Text(text = "Sign Up")
            }
        }
        Column(
            verticalArrangement = Arrangement.Bottom,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
        ) {
            Text(text = "Made with ❤\uFE0F")
            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

@Composable
@Preview(showSystemUi = true)
fun LoginScreenPreview() {
    val navController = rememberNavController()
    LoginScreen(navController)
}