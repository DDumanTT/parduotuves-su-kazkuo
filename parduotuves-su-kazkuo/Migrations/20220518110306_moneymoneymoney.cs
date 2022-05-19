using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class moneymoneymoney : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Money",
                table: "Accounts",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 11, 3, 5, 976, DateTimeKind.Utc).AddTicks(1123), "$2a$11$esNwj4MM6eHcyzbtLNoABOa4xCGp7bm0WugWOq/v/1EVBES57ZLA2", new DateTime(2022, 5, 18, 11, 3, 5, 976, DateTimeKind.Utc).AddTicks(1132) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Money",
                table: "Accounts");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 9, 45, 3, 645, DateTimeKind.Utc).AddTicks(658), "$2a$11$3VjlKl0IUy5nRekUOYa0gu2Zy3kOKCI.TuLHsDNvd84aIGIjWRGJK", new DateTime(2022, 5, 18, 9, 45, 3, 645, DateTimeKind.Utc).AddTicks(668) });
        }
    }
}
