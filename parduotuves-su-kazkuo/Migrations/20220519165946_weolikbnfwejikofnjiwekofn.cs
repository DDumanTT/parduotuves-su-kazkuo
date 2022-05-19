using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class weolikbnfwejikofnjiwekofn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "Prize",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 19, 16, 59, 46, 421, DateTimeKind.Utc).AddTicks(4300), "$2a$11$8PjHx82S018emLrNhw7fvetwHTGGAWi2IBs4jo6WWfzNet9U227C.", new DateTime(2022, 5, 19, 16, 59, 46, 421, DateTimeKind.Utc).AddTicks(4306) });

            migrationBuilder.CreateIndex(
                name: "IX_Prize_AccountId",
                table: "Prize",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prize_Accounts_AccountId",
                table: "Prize",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prize_Accounts_AccountId",
                table: "Prize");

            migrationBuilder.DropIndex(
                name: "IX_Prize_AccountId",
                table: "Prize");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Prize");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 19, 14, 50, 27, 157, DateTimeKind.Utc).AddTicks(6900), "$2a$11$vhZ7rRgn2mpmXTR/039hL.f3Py34sGRrdrCSTK19y2Wr8RyWWAEO6", new DateTime(2022, 5, 19, 14, 50, 27, 157, DateTimeKind.Utc).AddTicks(6905) });
        }
    }
}
