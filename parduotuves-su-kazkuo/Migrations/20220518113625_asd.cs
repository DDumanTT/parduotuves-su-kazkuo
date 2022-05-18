using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class asd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bid_Accounts_AccountId",
                table: "Bid");

            migrationBuilder.AlterColumn<int>(
                name: "AccountId",
                table: "Bid",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 11, 36, 25, 700, DateTimeKind.Utc).AddTicks(6970), "$2a$11$IEhV3TcOB5CodPuSieKK5eU9XAWKRl/4f3icnjssuu4ixOX2rRQca", new DateTime(2022, 5, 18, 11, 36, 25, 700, DateTimeKind.Utc).AddTicks(6977) });

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_Accounts_AccountId",
                table: "Bid",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bid_Accounts_AccountId",
                table: "Bid");

            migrationBuilder.AlterColumn<int>(
                name: "AccountId",
                table: "Bid",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 11, 36, 0, 619, DateTimeKind.Utc).AddTicks(9923), "$2a$11$HJGn6UGdsGwr0EjZ6Mm07.A35w/d0ZhkQWpvFpb4QOg810hA3qm9S", new DateTime(2022, 5, 18, 11, 36, 0, 619, DateTimeKind.Utc).AddTicks(9930) });

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_Accounts_AccountId",
                table: "Bid",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }
    }
}
