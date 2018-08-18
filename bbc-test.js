import { Selector, ClientFunction } from 'testcafe';

//define function to get current URL
const getLocation = ClientFunction(() => document.location.href);

//define test fixture and page to perform tests on
fixture `BBC Basic UI Test`
    .page `http://bbc.com`;


//define a test
//1) navigate to Sport section from BBC home page
//2) Select a story
//3) verify correct page was navigated to
test('Navigate to Story in Sport Section', async t => {
	
	//select 'Sport' link and click it.
	const sport = await Selector("a").withText("Sport");
	await t
		.click(sport);
	
	//select div which contains a link to 2nd story listed on Sport page. This element has a non-generic class name so it's easy to identify.
	const story = await Selector("div").withAttribute("class", "gel-layout__item anfield__item anfield__item--2 gel-1/3@m gel-1/4@xxl");
	let title = await story.textContent;
	//get path this link navigates to.
	let path = await story.find("a").getAttribute("href");
	
	//print out some info about the article we are navigating to
	console.log("Navigating to article: " + title.trim());
	console.log("Navigating to URL: " + path);
	
	//navigate to the story, and confirm that current URL is equal to the path on the hyperlink that was clicked.
	await t
		.click(story)
		.expect(getLocation()).contains(path);
});
