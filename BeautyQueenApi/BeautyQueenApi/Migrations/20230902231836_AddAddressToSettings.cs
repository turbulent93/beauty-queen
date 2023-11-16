using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAddressToSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Settings",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Address",
                value: null);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$fR36v5VfdS1q6o4pMJMgO.wJJNuQYUIsfUvJe2UcgabRcGsiE0Sw2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Settings");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$lWk8.DD7ShwjAGFuH5Z7POqfa850CkPjNdXgG3fQ4eJyubQapez8e");
        }
    }
}
