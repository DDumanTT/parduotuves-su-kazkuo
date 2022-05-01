using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class RemoveAcceptTerms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "Created", "Email", "FirstName", "LastName", "PasswordHash", "PasswordReset", "ResetToken", "ResetTokenExpires", "Role", "Updated", "VerificationToken", "Verified" },
                values: new object[] { -1, new DateTime(2022, 5, 1, 17, 26, 45, 529, DateTimeKind.Utc).AddTicks(3846), "admin@parduotuves.com", null, null, "$2a$11$DniCp4c8Z17TznYqV8eGGueAETULUxvqi/aR3YXUWPxvk5cTeUToC", null, null, null, 0, null, null, new DateTime(2022, 5, 1, 17, 26, 45, 529, DateTimeKind.Utc).AddTicks(3849) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1);
        }
    }
}
