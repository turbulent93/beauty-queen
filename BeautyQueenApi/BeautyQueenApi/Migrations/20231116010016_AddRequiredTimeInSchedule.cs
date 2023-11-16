using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRequiredTimeInSchedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartAt",
                table: "Schedule",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "EndAt",
                table: "Schedule",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$.D3yIlhEXmM3tm5JTkXE8OW9z1qcUslGqqRjAEDCw6G2PbyoUVsTC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartAt",
                table: "Schedule",
                type: "time without time zone",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone");

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "EndAt",
                table: "Schedule",
                type: "time without time zone",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$.l6qUqiUvfuNVrU7D9APvekgfSXhYkdxSUJA3d4sGHvgRyw/I726G");
        }
    }
}
