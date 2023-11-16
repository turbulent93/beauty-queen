using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultWorkTimeToSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeOnly>(
                name: "DefaultEndWorkTime",
                table: "Settings",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "DefaultStartWorkTime",
                table: "Settings",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DefaultEndWorkTime", "DefaultStartWorkTime" },
                values: new object[] { new TimeOnly(18, 0, 0), new TimeOnly(10, 0, 0) });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$.l6qUqiUvfuNVrU7D9APvekgfSXhYkdxSUJA3d4sGHvgRyw/I726G");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultEndWorkTime",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "DefaultStartWorkTime",
                table: "Settings");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$iJZWMRCab9m3uwTJDMKV3OjtAsQrEZlrl0CNABoIHR/km.cZEw8zi");
        }
    }
}
