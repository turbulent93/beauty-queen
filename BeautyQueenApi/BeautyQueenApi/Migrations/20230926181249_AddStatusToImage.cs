using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusToImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Image",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$kaztUmeCFT6DYeSE.pkXC.fIjT8VIZNkK2S12NcasZOb7H66svF/W");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Image");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$OXUwochdm8dsl3wmYdIydO5bnNIVIXvySc6TbJsz8UdUnpxN82Q0.");
        }
    }
}
