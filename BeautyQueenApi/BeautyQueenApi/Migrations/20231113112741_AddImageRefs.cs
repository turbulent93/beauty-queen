using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddImageRefs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employee_ImageId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Promo");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Photo");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Promo",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FileId",
                table: "Photo",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$OxWdx2OBvX41UNs2fk/vwO33Vlrd.G2MrKD01y31EsvtenzKM/FH.");

            migrationBuilder.CreateIndex(
                name: "IX_Promo_ImageId",
                table: "Promo",
                column: "ImageId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_FileId",
                table: "Photo",
                column: "FileId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_ImageId",
                table: "Employee",
                column: "ImageId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Image_FileId",
                table: "Photo",
                column: "FileId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Promo_Image_ImageId",
                table: "Promo",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Image_FileId",
                table: "Photo");

            migrationBuilder.DropForeignKey(
                name: "FK_Promo_Image_ImageId",
                table: "Promo");

            migrationBuilder.DropIndex(
                name: "IX_Promo_ImageId",
                table: "Promo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_FileId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Employee_ImageId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Promo");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Photo");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Promo",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "Photo",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Photo",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$kaztUmeCFT6DYeSE.pkXC.fIjT8VIZNkK2S12NcasZOb7H66svF/W");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_ImageId",
                table: "Employee",
                column: "ImageId");
        }
    }
}
