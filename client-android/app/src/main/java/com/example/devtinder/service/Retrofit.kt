package com.example.devtinder.service

import com.example.devtinder.common.BASE_URL
import com.example.devtinder.data.model.AuthResponse
import com.example.devtinder.data.model.LoginData
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

private val retrofit =
    Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()

val devTinderService = retrofit.create(ApiService::class.java)

interface ApiService {
    @Headers("X-Client-Type: mobile")
    @POST("/login")
    suspend fun authenticateUser(@Body data: LoginData): AuthResponse
}