{
    class PremiumPlan {
        static canstream = true;
        static canDownload = true;
        static hasSD = true;
        static hasHD = true;
        static hasUHD = true;
        static numOfDevices = 4;
        static price = "$15.99";
    }

    class BasicPlan extends(PremiumPlan) {
        static hasHD = false;
        static hasUHD = false;
        static numOfDevices = 1;
        static price = "$8.99";
    }

    class StandardPlan extends(PremiumPlan) {
        static hasHD = true;
        static hasUHD = false;
        static numOfDevices = 2;
        static price = "$12.99";
    }


    console.log(BasicPlan.hasSD);
    console.log(PremiumPlan.hasSD);
    console.log(BasicPlan.hasUHD);
    console.log(BasicPlan.price);
    console.log(PremiumPlan.numOfDevices);
}