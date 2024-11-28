describe("点击左侧面板", () => {
    beforeEach(() => {
        //设置浏览窗口的宽高
        cy.viewport(1800, 800);
        cy.visit("http://127.0.0.1:8088/");
        // 确保 Cesium 已加载
        cy.window().should('have.property', 'Cesium');
        cy.wait(3000);
    });
    context("点击左列菜单", () => {
        it("几何-基本要素", () => {
            /**
             * 定位父级的第一个 `father-content` 并展开子菜单
             * .within(() => { ... })
             * 这是一个作用域方法，用于限制后续选择器和操作的范围。
             * 作用：within 确保后续的 cy.get 或其他操作只会在当前选择的 .father-content（第一个）元素的内部执行，而不会影响页面上的其他部分。
             * 典型用法： 当你需要在一个特定的 DOM 区域中进行操作时，这非常有用。例如，点击某个区域的按钮或检查内容。
             */
            cy.get('.father-content').first().within(() => {
                // 点击父级的展开按钮
                cy.get('.father-item').click();

                // 确保子菜单内容已展开
                cy.get('.children-content')
                    .should('have.css', 'maxHeight')
                    .and('not.eq', '0rem');

                // 点击第一个子元素
                cy.get('.child-item').first().click();

                // 验证是否正确激活
                cy.get('.child-item').first().should('have.class', 'active');
            });

            // 等待页面导航完成，确保目标路由已加载
            cy.url().should('include', '/entitiesFeature'); // 替换为实际的路由路径
     

            // 测试 "添加线段" 按钮
            cy.contains('button', '添加线段').click();

            cy.wait(1000);
        
            // 测试 "线段体积(圆形)" 按钮
            cy.contains('button', '线段体积(圆形)').click();
            cy.wait(500);
        
            // 测试 "线段体积(直角)" 按钮
            cy.contains('button', '线段体积(直角)').click();
            cy.wait(500);
        
            // 测试 "线段体积(切角)" 按钮
            cy.contains('button', '线段体积(切角)').click();
            cy.wait(500);
        
            // 测试 "添加矩形" 按钮
            cy.contains('button', '添加矩形').click();
            cy.wait(500);
        
            // 测试 "添加球体" 按钮
            cy.contains('button', '添加球体').click();
            cy.wait(500);
        
            // 测试 "添加墙" 按钮
            cy.contains('button', '添加墙').click();
            cy.wait(500);
        
            // 测试 "添加多边形面" 按钮
            cy.contains('button', '添加多边形面').click();
            cy.wait(500);
        
            // 测试 "添加盒子模型" 按钮
            cy.contains('button', '添加盒子模型').click();
            cy.wait(500);
        
            // 测试 "添加椭圆形" 按钮
            cy.contains('button', '添加椭圆形').click();
            cy.wait(500);

            // 测试 "添加走廊" 按钮
            cy.contains('button', '添加走廊').click();
            cy.wait(500);

            // 测试 "添加圆柱" 按钮
            cy.contains('button', '添加圆柱').click();
            cy.wait(500);

            // 测试 "清除" 按钮
            cy.contains('button', '清除').click();
            cy.wait(500);

        });
    })
})