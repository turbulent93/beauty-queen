using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    /// <inheritdoc />
    public partial class AddInitDataToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "ExpiresIn", "Login", "Password", "RefreshToken", "RoleId" },
                values: new object[] { 1, null, "login1", "$2a$11$k7isr5JQ1scmxhsJN3CEbelyCJEdFgvJ6XLI1rpGLNA0hBu8w2/lG", null, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
