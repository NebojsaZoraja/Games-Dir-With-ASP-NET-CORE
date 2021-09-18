using Games_Dir_api.Configuration;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.ViewModels
{
    public class UserVM : IdentityUser
    {
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public string Role { get; set; }
    }

    public class UserRegistrationVM
    {   
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class UserRegistrationResponseVM : AuthResult
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class UserLoginResponseVM
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class UserLoginRequestVM
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class UserProfileVM
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class UserProfileEditVM
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserProfileEditAdminVM
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        public DateTime DateCreated { get; set; }
    }

    public class UserOrderVM
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
