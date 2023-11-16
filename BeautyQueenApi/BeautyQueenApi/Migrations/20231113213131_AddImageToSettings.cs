using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favicon",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "MainPhoto",
                table: "Settings");

            migrationBuilder.AddColumn<int>(
                name: "FaviconId",
                table: "Settings",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MainPhotoId",
                table: "Settings",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FaviconId", "MainPhotoId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$iJZWMRCab9m3uwTJDMKV3OjtAsQrEZlrl0CNABoIHR/km.cZEw8zi");

            migrationBuilder.CreateIndex(
                name: "IX_Settings_FaviconId",
                table: "Settings",
                column: "FaviconId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Settings_MainPhotoId",
                table: "Settings",
                column: "MainPhotoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Image_FaviconId",
                table: "Settings",
                column: "FaviconId",
                principalTable: "Image",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Image_MainPhotoId",
                table: "Settings",
                column: "MainPhotoId",
                principalTable: "Image",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Image_FaviconId",
                table: "Settings");

            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Image_MainPhotoId",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_FaviconId",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_MainPhotoId",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "FaviconId",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "MainPhotoId",
                table: "Settings");

            migrationBuilder.AddColumn<string>(
                name: "Favicon",
                table: "Settings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainPhoto",
                table: "Settings",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Favicon", "MainPhoto" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$OxWdx2OBvX41UNs2fk/vwO33Vlrd.G2MrKD01y31EsvtenzKM/FH.");
        }
    }
}
