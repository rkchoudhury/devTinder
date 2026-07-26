package com.example.devtinder.data.model

enum class MembershipType(val value: String) {
    GOLD("gold"),
    SILVER("silver")
}

data class User(
    val _id: String,
    val firstName: String,
    val lastName: String,
    val emailId: String,
    val about: String,
    val photoUrl: String,
    val skills: Array<String>,
    val createdAt: String,
    val updatedAt: String,
    val gender: String?,
    val age: Number?,
    val isPremium: Boolean?,
    val membershipType: MembershipType?,
    val membershipValidity: String?,
)

data class AuthResponse(
    val data: User,
    val message: String,
    val accessToken: String,
    val refreshToken: String,
)

data class LoginData(
    val emailId: String,
    val password: String,
)