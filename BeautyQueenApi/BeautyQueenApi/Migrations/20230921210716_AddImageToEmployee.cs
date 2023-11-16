using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Employee");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Employee",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$OXUwochdm8dsl3wmYdIydO5bnNIVIXvySc6TbJsz8UdUnpxN82Q0.");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_ImageId",
                table: "Employee",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Image_ImageId",
                table: "Employee",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Image_ImageId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_ImageId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Employee");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Employee",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$XlTxJMWt6PHKsi5niErgveXGesZ4m97w4txSDE.ftr4MHogJB/tD.");
        }
    }
}
