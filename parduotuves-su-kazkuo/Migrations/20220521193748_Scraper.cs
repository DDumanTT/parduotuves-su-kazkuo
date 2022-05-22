using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace parduotuvessukazkuo.Migrations
{
    public partial class Scraper : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Scraper",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Path = table.Column<int>(type: "int", nullable: true),
                    Frequency = table.Column<int>(type: "int", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scraper", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scraper_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 21, 19, 37, 48, 295, DateTimeKind.Utc).AddTicks(4387), "$2a$11$1UasXeDnZZPVaKjUNtP1eOcP9By56DvAzYmi3ZEhHN2H6qiiPtT7K", new DateTime(2022, 5, 21, 19, 37, 48, 295, DateTimeKind.Utc).AddTicks(4392) });

            migrationBuilder.CreateIndex(
                name: "IX_Scraper_ShopId",
                table: "Scraper",
                column: "ShopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Scraper");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Created", "PasswordHash", "Verified" },
                values: new object[] { new DateTime(2022, 5, 19, 16, 59, 46, 421, DateTimeKind.Utc).AddTicks(4300), "$2a$11$8PjHx82S018emLrNhw7fvetwHTGGAWi2IBs4jo6WWfzNet9U227C.", new DateTime(2022, 5, 19, 16, 59, 46, 421, DateTimeKind.Utc).AddTicks(4306) });
        }
    }
}
