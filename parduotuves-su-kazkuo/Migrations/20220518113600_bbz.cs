using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class bbz : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auction_Accounts_AccountId",
                table: "Auction");

            migrationBuilder.DropIndex(
                name: "IX_Auction_AccountId",
                table: "Auction");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Auction");

            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "Bid",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "Money", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 11, 36, 0, 619, DateTimeKind.Utc).AddTicks(9923), 9999999m, "$2a$11$HJGn6UGdsGwr0EjZ6Mm07.A35w/d0ZhkQWpvFpb4QOg810hA3qm9S", new DateTime(2022, 5, 18, 11, 36, 0, 619, DateTimeKind.Utc).AddTicks(9930) });

            migrationBuilder.CreateIndex(
                name: "IX_Bid_AccountId",
                table: "Bid",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_Accounts_AccountId",
                table: "Bid",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bid_Accounts_AccountId",
                table: "Bid");

            migrationBuilder.DropIndex(
                name: "IX_Bid_AccountId",
                table: "Bid");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Bid");

            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "Auction",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "Money", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 11, 3, 5, 976, DateTimeKind.Utc).AddTicks(1123), 0m, "$2a$11$esNwj4MM6eHcyzbtLNoABOa4xCGp7bm0WugWOq/v/1EVBES57ZLA2", new DateTime(2022, 5, 18, 11, 3, 5, 976, DateTimeKind.Utc).AddTicks(1132) });

            migrationBuilder.CreateIndex(
                name: "IX_Auction_AccountId",
                table: "Auction",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Auction_Accounts_AccountId",
                table: "Auction",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }
    }
}
