using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class AddShopLatLng : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coordinates",
                table: "Shop");

            migrationBuilder.AddColumn<string>(
                name: "Latitude",
                table: "Shop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Longitude",
                table: "Shop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 13, 28, 28, 643, DateTimeKind.Utc).AddTicks(3244), "$2a$11$3RY09gAT6Q4FqlpPgo7.x.jUKDmqs4WVLmXDUeyOLYDe9S002ej9u", new DateTime(2022, 5, 18, 13, 28, 28, 643, DateTimeKind.Utc).AddTicks(3248) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Shop");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Shop");

            migrationBuilder.AddColumn<string>(
                name: "Coordinates",
                table: "Shop",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 1, 17, 26, 45, 529, DateTimeKind.Utc).AddTicks(3846), "$2a$11$DniCp4c8Z17TznYqV8eGGueAETULUxvqi/aR3YXUWPxvk5cTeUToC", new DateTime(2022, 5, 1, 17, 26, 45, 529, DateTimeKind.Utc).AddTicks(3849) });
        }
    }
}
