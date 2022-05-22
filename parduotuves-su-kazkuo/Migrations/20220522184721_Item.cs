using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class Item : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 22, 18, 47, 21, 105, DateTimeKind.Utc).AddTicks(7013), "$2a$11$wxjlvIhd93LxO.PGveMbwejRlePB9esHVrc0iUhjKcmn37qFoXjbi", new DateTime(2022, 5, 22, 18, 47, 21, 105, DateTimeKind.Utc).AddTicks(7018) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 21, 19, 37, 48, 295, DateTimeKind.Utc).AddTicks(4387), "$2a$11$1UasXeDnZZPVaKjUNtP1eOcP9By56DvAzYmi3ZEhHN2H6qiiPtT7K", new DateTime(2022, 5, 21, 19, 37, 48, 295, DateTimeKind.Utc).AddTicks(4392) });
        }
    }
}
