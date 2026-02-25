/*
Example structure: xUnit + Moq + FluentAssertions
Adjust namespaces/DI patterns to match your repo.
*/

using FluentAssertions;
using Moq;
using Xunit;

public class PricingServiceTests
{
    [Fact]
    public void CalculateTotal_WhenDiscountApplied_ReturnsDiscountedTotal()
    {
        // Arrange
        var discountProvider = new Mock<IDiscountProvider>();
        discountProvider.Setup(x => x.GetDiscountPercent("VIP")).Returns(10);

        var sut = new PricingService(discountProvider.Object);

        // Act
        var total = sut.CalculateTotal(subtotal: 100m, customerTier: "VIP");

        // Assert
        total.Should().Be(90m);
    }

    [Theory]
    [InlineData(-1)]
    [InlineData(-100)]
    public void CalculateTotal_WhenSubtotalNegative_Throws(int subtotal)
    {
        // Arrange
        var discountProvider = new Mock<IDiscountProvider>();
        var sut = new PricingService(discountProvider.Object);

        // Act
        var act = () => sut.CalculateTotal(subtotal, "STD");

        // Assert
        act.Should().Throw<ArgumentOutOfRangeException>();
    }
}
