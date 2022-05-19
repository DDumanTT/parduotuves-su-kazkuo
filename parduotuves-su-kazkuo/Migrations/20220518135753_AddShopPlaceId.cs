using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class AddShopPlaceId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlaceId",
                table: "Shop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 13, 57, 53, 690, DateTimeKind.Utc).AddTicks(8420), "$2a$11$7qkUti5XRybDBz1f9u3GkeGXxJ2YdbSXXlI2bsqBYT6YBoYnwOnsm", new DateTime(2022, 5, 18, 13, 57, 53, 690, DateTimeKind.Utc).AddTicks(8424) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Shop");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 13, 28, 28, 643, DateTimeKind.Utc).AddTicks(3244), "$2a$11$3RY09gAT6Q4FqlpPgo7.x.jUKDmqs4WVLmXDUeyOLYDe9S002ej9u", new DateTime(2022, 5, 18, 13, 28, 28, 643, DateTimeKind.Utc).AddTicks(3248) });
        }
    }
}
