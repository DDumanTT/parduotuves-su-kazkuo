using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class asdddddddd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Auction",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 19, 14, 50, 27, 157, DateTimeKind.Utc).AddTicks(6900), "$2a$11$vhZ7rRgn2mpmXTR/039hL.f3Py34sGRrdrCSTK19y2Wr8RyWWAEO6", new DateTime(2022, 5, 19, 14, 50, 27, 157, DateTimeKind.Utc).AddTicks(6905) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Auction");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 11, 36, 25, 700, DateTimeKind.Utc).AddTicks(6970), "$2a$11$IEhV3TcOB5CodPuSieKK5eU9XAWKRl/4f3icnjssuu4ixOX2rRQca", new DateTime(2022, 5, 18, 11, 36, 25, 700, DateTimeKind.Utc).AddTicks(6977) });
        }
    }
}
