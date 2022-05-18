using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class cgvhjyughvghjfghcfgyhjfghfgtvyh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "WinDate",
                table: "Prize",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 18, 9, 45, 3, 645, DateTimeKind.Utc).AddTicks(658), "$2a$11$3VjlKl0IUy5nRekUOYa0gu2Zy3kOKCI.TuLHsDNvd84aIGIjWRGJK", new DateTime(2022, 5, 18, 9, 45, 3, 645, DateTimeKind.Utc).AddTicks(668) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "WinDate",
                table: "Prize",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 17, 20, 33, 58, 217, DateTimeKind.Utc).AddTicks(7436), "$2a$11$Us1PYy.AcyQSwRxVBzH4o.9WszQVxWTDqh7.2w9lxaZ37kUm4MibW", new DateTime(2022, 5, 17, 20, 33, 58, 217, DateTimeKind.Utc).AddTicks(7473) });
        }
    }
}
